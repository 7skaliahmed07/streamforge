
from pyspark.sql import SparkSession
from pyspark.sql import functions as F
from pyspark.sql.types import (
    StructType,
    StructField,
    StringType,
    IntegerType,
    LongType,
    DecimalType,
)

BRONZE_PATH = "/opt/spark-data/bronze/postgresql/streamforge"

SILVER_PATH = (
    "/opt/spark-data/silver/postgresql/streamforge/"
    "products/events_v1"
)


def product_schema():
    return StructType([
        StructField("id", IntegerType(), True),
        StructField("name", StringType(), True),
        StructField("category", StringType(), True),
        StructField("price", StringType(), True),
        StructField("created_at", LongType(), True),
        StructField("updated_at", LongType(), True),
        StructField("brand", StringType(), True),
        StructField("currency", StringType(), True),
        StructField("vat_percentage", StringType(), True),
    ])


def source_schema():
    return StructType([
        StructField("version", StringType(), True),
        StructField("connector", StringType(), True),
        StructField("name", StringType(), True),
        StructField("ts_ms", LongType(), True),
        StructField("snapshot", StringType(), True),
        StructField("db", StringType(), True),
        StructField("sequence", StringType(), True),
        StructField("ts_us", LongType(), True),
        StructField("ts_ns", LongType(), True),
        StructField("schema", StringType(), True),
        StructField("table", StringType(), True),
        StructField("txId", LongType(), True),
        StructField("lsn", LongType(), True),
        StructField("xmin", LongType(), True),
    ])


def envelope_schema():
    product = product_schema()

    transaction = StructType([
        StructField("id", StringType(), True),
        StructField("total_order", LongType(), True),
        StructField("data_collection_order", LongType(), True),
    ])

    payload = StructType([
        StructField("before", product, True),
        StructField("after", product, True),
        StructField("source", source_schema(), True),
        StructField("transaction", transaction, True),
        StructField("op", StringType(), True),
        StructField("ts_ms", LongType(), True),
        StructField("ts_us", LongType(), True),
        StructField("ts_ns", LongType(), True),
    ])

    return StructType([
        StructField("payload", payload, True),
    ])


def decode_decimal(value, precision):
    """
    Decode Debezium Base64 encoded decimal bytes.

    PostgreSQL DECIMAL values use scale 2 in our
    current products table.
    """

    integer_value = F.conv(
        F.hex(F.unbase64(value)),
        16,
        10
    ).cast(DecimalType(20, 0))

    return (
        (integer_value / F.lit(100))
        .cast(DecimalType(precision, 2))
    )


def main():
    spark = (
        SparkSession.builder
        .appName("StreamForge-Silver-Products")
        .getOrCreate()
    )

    spark.sparkContext.setLogLevel("WARN")

    print("Reading Bronze product events...")

    bronze = (
        spark.read
        .parquet(BRONZE_PATH)
        .filter(F.col("source_table") == "products")
    )

    print("Parsing Debezium JSON...")

    parsed = bronze.withColumn(
        "event",
        F.from_json(
            F.col("message_value"),
            envelope_schema()
        )
    )

    valid = parsed.filter(
        F.col("event.payload").isNotNull()
    )

    payload = F.col("event.payload")
    before = payload.getField("before")
    after = payload.getField("after")
    source = payload.getField("source")
    transaction = payload.getField("transaction")

    # Use before image for deletes and after image
    # for inserts, updates and snapshot reads.
    record = F.coalesce(after, before)

    price = record.getField("price")
    vat = record.getField("vat_percentage")

    silver = valid.select(
        # Kafka metadata
        F.col("topic"),
        F.col("partition"),
        F.col("offset"),
        F.col("kafka_timestamp"),
        F.col("event_date"),

        # CDC operation
        payload.getField("op").alias("operation"),

        # Snapshot information
        source.getField("snapshot").alias("snapshot_type"),

        # PostgreSQL source metadata
        source.getField("db").alias("source_database"),
        source.getField("schema").alias("source_schema"),
        source.getField("table").alias("source_table"),
        source.getField("lsn").alias("source_lsn"),
        source.getField("txId").alias("transaction_id"),

        # Debezium transaction metadata
        transaction.getField("id").alias("debezium_transaction_id"),
        transaction.getField("total_order").alias("transaction_order"),
        transaction.getField("data_collection_order").alias(
            "data_collection_order"
        ),

        # Event timestamp
        F.timestamp_millis(
            payload.getField("ts_ms")
        ).alias("event_timestamp"),

        # Product fields
        record.getField("id").alias("product_id"),
        record.getField("name").alias("product_name"),
        record.getField("category").alias("category"),
        record.getField("brand").alias("brand"),
        record.getField("currency").alias("currency"),

        # Decode Base64 decimal fields
        decode_decimal(price, 10).alias("price"),
        decode_decimal(vat, 5).alias("vat_percentage"),

        # Convert microseconds to timestamps
        F.timestamp_micros(
            record.getField("created_at")
        ).alias("created_at"),

        F.timestamp_micros(
            record.getField("updated_at")
        ).alias("updated_at"),

        # Preserve original images for audit and replay
        before.alias("before"),
        after.alias("after"),
    )

    print("Writing Silver product events...")

    (
        silver.write
        .mode("overwrite")
        .partitionBy("event_date")
        .parquet(SILVER_PATH)
    )

    print("\n========== SILVER PRODUCT SUMMARY ==========")

    print("Total valid events:", silver.count())

    silver.groupBy(
        "operation",
        "snapshot_type"
    ).count().orderBy(
        "operation",
        "snapshot_type"
    ).show(truncate=False)

    print("\n========== PRODUCT DATA QUALITY ==========")

    print(
        "Events without product ID:",
        silver.filter(F.col("product_id").isNull()).count()
    )

    print(
        "Events without price:",
        silver.filter(F.col("price").isNull()).count()
    )

    print(
        "Events without VAT:",
        silver.filter(F.col("vat_percentage").isNull()).count()
    )

    print("\n========== PRODUCT SILVER SAMPLE ==========")

    (
        silver
        .orderBy(F.desc("offset"))
        .select(
            "product_id",
            "product_name",
            "category",
            "brand",
            "price",
            "currency",
            "vat_percentage",
            "operation",
            "snapshot_type"
        )
        .show(10, truncate=False)
    )

    print("\nSilver product events created at:", SILVER_PATH)

    spark.stop()


if __name__ == "__main__":
    main()
