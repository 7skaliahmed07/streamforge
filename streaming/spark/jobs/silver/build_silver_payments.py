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
    "payments/events_v1"
)

payment_schema = StructType([
    StructField("id", IntegerType()),
    StructField("order_id", IntegerType()),
    StructField("payment_status", StringType()),
    StructField("payment_method", StringType()),
    StructField("amount", StringType()),
    StructField("created_at", LongType())
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
    StructField("before", payment_schema),
    StructField("after", payment_schema),
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
        .appName("StreamForge-Silver-Payments")
        .getOrCreate()
    )

    spark.sparkContext.setLogLevel("WARN")

    print("Reading Bronze payment events...")

    bronze = (
        spark.read.parquet(BRONZE_PATH)
        .filter(F.col("source_table") == "payments")
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

    print("Transforming payment records...")

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

        record.getField("id").alias("payment_id"),
        record.getField("order_id").alias("order_id"),
        record.getField("payment_status").alias("payment_status"),
        record.getField("payment_method").alias("payment_method"),

        decode_decimal(
            record.getField("amount")
        ).alias("amount"),

        F.timestamp_micros(
            record.getField("created_at")
        ).alias("created_at"),

        payload.getField("ts_ms").alias("source_event_timestamp_ms")
    ).filter(F.col("payment_id").isNotNull())

    print("Writing Silver payment events...")

    (
        silver.write
        .mode("overwrite")
        .partitionBy("event_date")
        .parquet(SILVER_PATH)
    )

    result = spark.read.parquet(SILVER_PATH)

    print("\n========== SILVER PAYMENT SUMMARY ==========")
    print("Total valid events:", result.count())

    (
        result.groupBy("operation", "snapshot_type")
        .count()
        .orderBy("operation")
        .show(truncate=False)
    )

    print("\n========== PAYMENT DATA QUALITY ==========")

    result.select(
        F.sum(
            F.when(F.col("payment_id").isNull(), 1).otherwise(0)
        ).alias("missing_payment_ids"),

        F.sum(
            F.when(F.col("order_id").isNull(), 1).otherwise(0)
        ).alias("missing_order_ids"),

        F.sum(
            F.when(F.col("amount").isNull(), 1).otherwise(0)
        ).alias("missing_amounts"),

        F.sum(
            F.when(F.col("created_at").isNull(), 1).otherwise(0)
        ).alias("missing_created_at")
    ).show(truncate=False)

    print("\n========== SILVER PAYMENT SAMPLE ==========")

    (
        result.select(
            "payment_id",
            "order_id",
            "payment_status",
            "payment_method",
            "amount",
            "created_at",
            "operation",
            "snapshot_type"
        )
        .orderBy(F.col("offset").desc())
        .show(10, truncate=False)
    )

    print("\nSilver payment events created at:", SILVER_PATH)

    spark.stop()


if __name__ == "__main__":
    main()
PYcat > streaming/spark/jobs/silver/build_silver_payments.py <<'PY'
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
    "payments/events_v1"
)

payment_schema = StructType([
    StructField("id", IntegerType()),
    StructField("order_id", IntegerType()),
    StructField("payment_status", StringType()),
    StructField("payment_method", StringType()),
    StructField("amount", StringType()),
    StructField("created_at", LongType())
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
    StructField("before", payment_schema),
    StructField("after", payment_schema),
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
        .appName("StreamForge-Silver-Payments")
        .getOrCreate()
    )

    spark.sparkContext.setLogLevel("WARN")

    print("Reading Bronze payment events...")

    bronze = (
        spark.read.parquet(BRONZE_PATH)
        .filter(F.col("source_table") == "payments")
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

    print("Transforming payment records...")

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

        record.getField("id").alias("payment_id"),
        record.getField("order_id").alias("order_id"),
        record.getField("payment_status").alias("payment_status"),
        record.getField("payment_method").alias("payment_method"),

        decode_decimal(
            record.getField("amount")
        ).alias("amount"),

        F.timestamp_micros(
            record.getField("created_at")
        ).alias("created_at"),

        payload.getField("ts_ms").alias("source_event_timestamp_ms")
    ).filter(F.col("payment_id").isNotNull())

    print("Writing Silver payment events...")

    (
        silver.write
        .mode("overwrite")
        .partitionBy("event_date")
        .parquet(SILVER_PATH)
    )

    result = spark.read.parquet(SILVER_PATH)

    print("\n========== SILVER PAYMENT SUMMARY ==========")
    print("Total valid events:", result.count())

    (
        result.groupBy("operation", "snapshot_type")
        .count()
        .orderBy("operation")
        .show(truncate=False)
    )

    print("\n========== PAYMENT DATA QUALITY ==========")

    result.select(
        F.sum(
            F.when(F.col("payment_id").isNull(), 1).otherwise(0)
        ).alias("missing_payment_ids"),

        F.sum(
            F.when(F.col("order_id").isNull(), 1).otherwise(0)
        ).alias("missing_order_ids"),

        F.sum(
            F.when(F.col("amount").isNull(), 1).otherwise(0)
        ).alias("missing_amounts"),

        F.sum(
            F.when(F.col("created_at").isNull(), 1).otherwise(0)
        ).alias("missing_created_at")
    ).show(truncate=False)

    print("\n========== SILVER PAYMENT SAMPLE ==========")

    (
        result.select(
            "payment_id",
            "order_id",
            "payment_status",
            "payment_method",
            "amount",
            "created_at",
            "operation",
            "snapshot_type"
        )
        .orderBy(F.col("offset").desc())
        .show(10, truncate=False)
    )

    print("\nSilver payment events created at:", SILVER_PATH)

    spark.stop()


if __name__ == "__main__":
    main()
