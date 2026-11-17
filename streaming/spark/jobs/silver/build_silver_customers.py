
from pyspark.sql import SparkSession
from pyspark.sql import functions as F
from pyspark.sql.types import (
    StructType,
    StructField,
    StringType,
    IntegerType,
    LongType,
)

BRONZE_PATH = "/opt/spark-data/bronze/postgresql/streamforge"

SILVER_PATH = (
    "/opt/spark-data/silver/postgresql/streamforge/"
    "customers/events_v1"
)


def customer_schema():
    return StructType([
        StructField("id", IntegerType(), True),
        StructField("first_name", StringType(), True),
        StructField("last_name", StringType(), True),
        StructField("email", StringType(), True),
        StructField("phone", StringType(), True),
        StructField("created_at", LongType(), True),
        StructField("updated_at", LongType(), True),
        StructField("city", StringType(), True),
        StructField("postal_code", StringType(), True),
        StructField("country", StringType(), True),
        StructField("customer_segment", StringType(), True),
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
    customer = customer_schema()

    payload = StructType([
        StructField("before", customer, True),
        StructField("after", customer, True),
        StructField("source", source_schema(), True),
        StructField("op", StringType(), True),
        StructField("ts_ms", LongType(), True),
        StructField("ts_us", LongType(), True),
        StructField("ts_ns", LongType(), True),
    ])

    # Debezium JSON contains both schema and payload.
    return StructType([
        StructField("payload", payload, True),
    ])


def main():
    spark = (
        SparkSession.builder
        .appName("StreamForge-Silver-Customers")
        .getOrCreate()
    )

    spark.sparkContext.setLogLevel("WARN")

    print("Reading Bronze customer events...")

    bronze = (
        spark.read
        .parquet(BRONZE_PATH)
        .filter(F.col("source_table") == "customers")
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

    # For deletes, use the before image as the event record.
    # For inserts and updates, use the after image.
    record = F.coalesce(after, before)

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

        # Debezium event timestamp
        F.timestamp_millis(
            payload.getField("ts_ms")
        ).alias("event_timestamp"),

        # Preserve the original before and after images
        before.alias("before"),
        after.alias("after"),

        # Structured customer fields
        record.getField("id").alias("customer_id"),
        record.getField("first_name").alias("first_name"),
        record.getField("last_name").alias("last_name"),
        record.getField("email").alias("email"),
        record.getField("phone").alias("phone"),
        record.getField("city").alias("city"),
        record.getField("postal_code").alias("postal_code"),
        record.getField("country").alias("country"),
        record.getField("customer_segment").alias(
            "customer_segment"
        ),

        # Convert microseconds into Spark timestamps
        F.timestamp_micros(
            record.getField("created_at")
        ).alias("created_at"),

        F.timestamp_micros(
            record.getField("updated_at")
        ).alias("updated_at"),
    )

    print("Writing customer Silver events...")

    (
        silver.write
        .mode("overwrite")
        .partitionBy("event_date")
        .parquet(SILVER_PATH)
    )

    print("\n========== SILVER CUSTOMER SUMMARY ==========")

    print("Total valid events:", silver.count())

    silver.groupBy(
        "operation",
        "snapshot_type"
    ).count().orderBy(
        "operation",
        "snapshot_type"
    ).show(truncate=False)

    print("\n========== CUSTOMER SILVER SAMPLE ==========")

    (
        silver
        .orderBy(F.desc("offset"))
        .select(
            "customer_id",
            "first_name",
            "last_name",
            "city",
            "customer_segment",
            "operation",
            "snapshot_type",
            "created_at",
            "updated_at"
        )
        .show(5, truncate=False)
    )

    print("\nSilver customer events created at:", SILVER_PATH)

    spark.stop()


if __name__ == "__main__":
    main()
