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
    "/opt/spark-data/silver/postgresql/streamforge/orders/events_v1"
)


order_schema = StructType([
    StructField("id", IntegerType()),
    StructField("customer_id", IntegerType()),
    StructField("order_status", StringType()),
    StructField("total_amount", StringType()),
    StructField("created_at", LongType()),
    StructField("updated_at", LongType()),
    StructField("order_number", StringType()),
    StructField("currency", StringType()),
    StructField("shipping_city", StringType())
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
    StructField("before", order_schema),
    StructField("after", order_schema),
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
        .appName("StreamForge-Silver-Orders")
        .getOrCreate()
    )

    spark.sparkContext.setLogLevel("WARN")

    print("Reading Bronze order events...")

    bronze = (
        spark.read.parquet(BRONZE_PATH)
        .filter(F.col("source_table") == "orders")
    )

    print("Parsing Debezium JSON...")

    parsed = bronze.withColumn(
        "envelope",
        F.from_json(
            F.get_json_object(F.col("message_value"), "$.payload"),
            envelope_schema
        )
    )

    payload = F.col("envelope")

    record = F.coalesce(
        payload.getField("after"),
        payload.getField("before")
    )

    print("Transforming order records...")

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

        payload.getField("source").getField("db")
            .alias("source_database"),

        payload.getField("source").getField("schema")
            .alias("source_schema"),

        payload.getField("source").getField("table")
            .alias("source_table"),

        payload.getField("source").getField("lsn")
            .alias("source_lsn"),

        payload.getField("source").getField("txId")
            .alias("source_transaction_id"),

        payload.getField("transaction").getField("id")
            .alias("transaction_id"),

        payload.getField("transaction").getField("total_order")
            .alias("transaction_total_order"),

        payload.getField("transaction").getField("data_collection_order")
            .alias("transaction_collection_order"),

        F.col("envelope.before").alias("before"),
        F.col("envelope.after").alias("after"),

        record.getField("id").alias("order_id"),
        record.getField("customer_id").alias("customer_id"),
        record.getField("order_status").alias("order_status"),

        decode_decimal(
            record.getField("total_amount")
        ).alias("total_amount"),

        F.timestamp_micros(
            record.getField("created_at")
        ).alias("created_at"),

        F.timestamp_micros(
            record.getField("updated_at")
        ).alias("updated_at"),

        record.getField("order_number").alias("order_number"),
        record.getField("currency").alias("currency"),
        record.getField("shipping_city").alias("shipping_city"),

        payload.getField("ts_ms").alias("source_event_timestamp_ms")
    ).filter(
        F.col("order_id").isNotNull()
    )

    print("Writing Silver order events...")

    (
        silver.write
        .mode("overwrite")
        .partitionBy("event_date")
        .parquet(SILVER_PATH)
    )

    result = spark.read.parquet(SILVER_PATH)

    print("\n========== SILVER ORDER SUMMARY ==========")
    print("Total valid events:", result.count())

    (
        result
        .groupBy("operation", "snapshot_type")
        .count()
        .orderBy("operation")
        .show(truncate=False)
    )

    print("\n========== ORDER DATA QUALITY ==========")

    result.select(
        F.sum(
            F.when(F.col("order_id").isNull(), 1).otherwise(0)
        ).alias("missing_order_ids"),

        F.sum(
            F.when(F.col("customer_id").isNull(), 1).otherwise(0)
        ).alias("missing_customer_ids"),

        F.sum(
            F.when(F.col("total_amount").isNull(), 1).otherwise(0)
        ).alias("missing_amounts")
    ).show(truncate=False)

    print("\n========== SILVER ORDER SAMPLE ==========")

    (
        result
        .select(
            "order_id",
            "customer_id",
            "order_number",
            "order_status",
            "total_amount",
            "currency",
            "shipping_city",
            "operation",
            "snapshot_type"
        )
        .orderBy(F.col("offset").desc())
        .show(10, truncate=False)
    )

    print("\nSilver order events created at:", SILVER_PATH)

    spark.stop()


if __name__ == "__main__":
    main()
