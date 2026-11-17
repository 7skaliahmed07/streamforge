from pyspark.sql import SparkSession
from pyspark.sql import functions as F
from pyspark.sql.window import Window

EVENTS_PATH = (
    "/opt/spark-data/silver/postgresql/streamforge/"
    "payments/events_v1"
)

CURRENT_PATH = (
    "/opt/spark-data/silver/postgresql/streamforge/"
    "payments/current_v1"
)


def main():
    spark = (
        SparkSession.builder
        .appName("StreamForge-Silver-Payments-Current")
        .getOrCreate()
    )

    spark.sparkContext.setLogLevel("WARN")

    print("Reading Silver payment events...")

    events = spark.read.parquet(EVENTS_PATH)

    print("\n========== PARTITION CONSISTENCY CHECK ==========")

    partition_issues = (
        events
        .groupBy("payment_id")
        .agg(F.countDistinct("partition").alias("partition_count"))
        .filter(F.col("partition_count") > 1)
    )

    issue_count = partition_issues.count()
    print("Payment IDs across multiple Kafka partitions:", issue_count)

    if issue_count > 0:
        partition_issues.show(10, truncate=False)
        raise ValueError(
            "Payment IDs span multiple Kafka partitions. "
            "Cannot safely determine latest events using offsets alone."
        )

    print("\nPartition consistency check passed.")

    print("\n========== BUILDING CURRENT PAYMENTS ==========")

    window = (
        Window
        .partitionBy("payment_id")
        .orderBy(
            F.col("offset").desc(),
            F.col("kafka_timestamp").desc()
        )
    )

    current = (
        events
        .withColumn("row_number", F.row_number().over(window))
        .filter(F.col("row_number") == 1)
        .filter(F.col("operation") != "d")
        .drop("row_number")
    )

    (
        current.write
        .mode("overwrite")
        .partitionBy("event_date")
        .parquet(CURRENT_PATH)
    )

    result = spark.read.parquet(CURRENT_PATH)

    print("\n========== CURRENT PAYMENT SUMMARY ==========")

    print("Total current payments:", result.count())

    result.groupBy("payment_status").count().orderBy(
        "payment_status"
    ).show(truncate=False)

    print("\n========== PAYMENT BUSINESS SUMMARY ==========")

    result.agg(
        F.count("*").alias("total_payments"),
        F.sum("amount").alias("total_payment_amount"),
        F.avg("amount").alias("average_payment_amount"),
        F.min("amount").alias("minimum_payment_amount"),
        F.max("amount").alias("maximum_payment_amount")
    ).show(truncate=False)

    print("\n========== CURRENT PAYMENT SAMPLE ==========")

    result.select(
        "payment_id",
        "order_id",
        "payment_status",
        "payment_method",
        "amount",
        "created_at",
        "operation"
    ).orderBy("payment_id").show(10, truncate=False)

    print("\nCurrent payments created at:", CURRENT_PATH)

    spark.stop()


if __name__ == "__main__":
    main()
