from pyspark.sql import SparkSession
from pyspark.sql import functions as F
from pyspark.sql.window import Window

EVENTS_PATH = (
    "/opt/spark-data/silver/postgresql/streamforge/"
    "orders/events_v1"
)

CURRENT_PATH = (
    "/opt/spark-data/silver/postgresql/streamforge/"
    "orders/current_v1"
)


def main():
    spark = (
        SparkSession.builder
        .appName("StreamForge-Silver-Orders-Current")
        .getOrCreate()
    )

    spark.sparkContext.setLogLevel("WARN")

    print("Reading Silver order events...")

    events = spark.read.parquet(EVENTS_PATH)

    print("Checking Kafka partition consistency...")

    partition_check = (
        events.groupBy("order_id")
        .agg(
            F.countDistinct("partition").alias("partition_count")
        )
        .filter(F.col("partition_count") > 1)
    )

    if partition_check.limit(1).count() > 0:
        raise ValueError(
            "An order ID appears in multiple Kafka partitions. "
            "Offset ordering alone is not safe."
        )

    print("All order IDs belong to a single Kafka partition.")

    print("Finding the latest event for each order...")

    window = (
        Window
        .partitionBy("order_id")
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

    print("Writing Orders Current...")

    (
        current.write
        .mode("overwrite")
        .parquet(CURRENT_PATH)
    )

    result = spark.read.parquet(CURRENT_PATH)

    print("\n========== ORDERS CURRENT SUMMARY ==========")
    print("Total current orders:", result.count())

    print("\n========== ORDER STATUS SUMMARY ==========")

    (
        result.groupBy("order_status")
        .count()
        .orderBy(F.col("count").desc())
        .show(truncate=False)
    )

    print("\n========== CURRENT ORDER SAMPLE ==========")

    (
        result.select(
            "order_id",
            "customer_id",
            "order_number",
            "order_status",
            "total_amount",
            "currency",
            "shipping_city"
        )
        .orderBy(F.col("order_id").desc())
        .show(10, truncate=False)
    )

    print("\nOrders Current created at:", CURRENT_PATH)

    spark.stop()


if __name__ == "__main__":
    main()
