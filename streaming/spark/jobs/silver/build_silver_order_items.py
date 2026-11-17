from pyspark.sql import SparkSession
from pyspark.sql import functions as F
from pyspark.sql.types import (
    StructType,
    StructField,
    IntegerType,
    StringType,
    LongType,
    DecimalType
)

BRONZE_PATH = "/opt/spark-data/bronze/postgresql/streamforge"

SILVER_PATH = (
    "/opt/spark-data/silver/postgresql/streamforge/"
    "order_items/events_v1"
)

item_schema = StructType([
    StructField("id", IntegerType()),
    StructField("order_id", IntegerType()),
    StructField("product_id", IntegerType()),
    StructField("quantity", IntegerType()),
    StructField("price", StringType())
])

source_schema = StructType([
    StructField("version", StringType()),
    StructField("connector", StringType()),
    StructField("name", StringType()),
    StructField("ts_ms", LongType()),
    StructField("snapshot", StringType()),
    StructField("db", StringType()),
    StructField("sequence", StringType()),
    StructField("ts_us", LongType()),
    StructField("ts_ns", LongType()),
    StructField("schema", StringType()),
    StructField("table", StringType()),
    StructField("txId", LongType()),
    StructField("lsn", LongType()),
    StructField("xmin", LongType())
])

transaction_schema = StructType([
    StructField("id", StringType()),
    StructField("total_order", LongType()),
    StructField("data_collection_order", LongType())
])

envelope_schema = StructType([
    StructField("before", item_schema),
    StructField("after", item_schema),
    StructField("source", source_schema),
    StructField("transaction", transaction_schema),
    StructField("op", StringType()),
    StructField("ts_ms", LongType()),
    StructField("ts_us", LongType()),
    StructField("ts_ns", LongType())
])


def decode_decimal(value):
    integer_value = F.conv(
        F.hex(F.unbase64(value)),
        16,
        10
    ).cast(DecimalType(20, 0))

    return (
        integer_value / F.lit(100)
    ).cast(DecimalType(10, 2))


def main():
    spark = (
        SparkSession.builder
        .appName("StreamForge-Silver-Order-Items")
        .getOrCreate()
    )

    spark.sparkContext.setLogLevel("WARN")

    print("Reading Bronze order item events...")

    bronze = (
        spark.read.parquet(BRONZE_PATH)
        .filter(F.col("source_table") == "order_items")
    )

    print("Parsing Debezium JSON...")

    parsed = bronze.withColumn(
        "envelope",
        F.from_json(
            F.get_json_object(
                F.col("message_value"),
                "$.payload"
            ),
            envelope_schema
        )
    )

    payload = F.col("envelope")

    record = F.coalesce(
        payload.getField("after"),
        payload.getField("before")
    )

    print("Transforming order item records...")

    silver = parsed.select(
        F.col("topic"),
        F.col("partition"),
        F.col("offset"),
        F.col("kafka_timestamp"),
        F.col("event_date"),
        F.col("message_key"),

        payload.getField("op").alias("operation"),

        F.coalesce(
            payload.getField("source").getField("snapshot"),
            F.lit("false")
        ).alias("snapshot_type"),

        payload.getField("source").getField("db").alias("source_database"),
        payload.getField("source").getField("schema").alias("source_schema"),
        payload.getField("source").getField("table").alias("source_table"),
        payload.getField("source").getField("lsn").alias("source_lsn"),
        payload.getField("source").getField("txId").alias("source_transaction_id"),

        payload.getField("transaction").getField("id").alias("transaction_id"),
        payload.getField("transaction").getField("total_order").alias("transaction_total_order"),
        payload.getField("transaction").getField("data_collection_order").alias("transaction_collection_order"),

        payload.getField("before").alias("before"),
        payload.getField("after").alias("after"),

        record.getField("id").alias("order_item_id"),
        record.getField("order_id").alias("order_id"),
        record.getField("product_id").alias("product_id"),
        record.getField("quantity").alias("quantity"),

        decode_decimal(
            record.getField("price")
        ).alias("unit_price"),

        payload.getField("ts_ms").alias("source_event_timestamp_ms")
    ).filter(F.col("order_item_id").isNotNull())

    print("Writing Silver order item events...")

    (
        silver.write
        .mode("overwrite")
        .partitionBy("event_date")
        .parquet(SILVER_PATH)
    )

    result = spark.read.parquet(SILVER_PATH)

    print("\n========== SILVER ORDER ITEM SUMMARY ==========")
    print("Total valid events:", result.count())

    (
        result.groupBy("operation", "snapshot_type")
        .count()
        .orderBy("operation")
        .show(truncate=False)
    )

    print("\n========== ORDER ITEM DATA QUALITY ==========")

    result.select(
        F.sum(
            F.when(F.col("order_item_id").isNull(), 1).otherwise(0)
        ).alias("missing_item_ids"),

        F.sum(
            F.when(F.col("order_id").isNull(), 1).otherwise(0)
        ).alias("missing_order_ids"),

        F.sum(
            F.when(F.col("product_id").isNull(), 1).otherwise(0)
        ).alias("missing_product_ids"),

        F.sum(
            F.when(F.col("quantity").isNull(), 1).otherwise(0)
        ).alias("missing_quantities"),

        F.sum(
            F.when(F.col("unit_price").isNull(), 1).otherwise(0)
        ).alias("missing_prices")
    ).show(truncate=False)

    print("\n========== SILVER ORDER ITEM SAMPLE ==========")

    (
        result.select(
            "order_item_id",
            "order_id",
            "product_id",
            "quantity",
            "unit_price",
            "operation",
            "snapshot_type"
        )
        .orderBy(F.col("offset").desc())
        .show(10, truncate=False)
    )

    print("\nSilver order item events created at:", SILVER_PATH)

    spark.stop()


if __name__ == "__main__":
    main()
