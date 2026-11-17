from pyspark.sql import SparkSession
from pyspark.sql import functions as F
from pyspark.sql.window import Window

EVENTS_PATH = (
    "/opt/spark-data/silver/postgresql/streamforge/"
    "order_items/events_v1"
)

CURRENT_PATH = (
    "/opt/spark-data/silver/postgresql/streamforge/"
    "order_items/current_v1"
)


def main():
    spark = (
        SparkSession.builder
        .appName("StreamForge-Silver-Order-Items-Current")
        .getOrCreate()
    )

    spark.sparkContext.setLogLevel("WARN")

    print("Reading Silver order item events...")

    events = spark.read.parquet(EVENTS_PATH)

    print("Checking Kafka partition consistency...")

    partition_check = (
        events.groupBy("order_item_id")
        .agg(
            F.countDistinct("partition").alias("partition_count")
        )
        .filter(F.col("partition_count") > 1)
    )

    if partition_check.limit(1).count() > 0:
        raise ValueError(
            "An order item ID appears in multiple Kafka partitions. "
            "Offset ordering alone is not safe."
        )

    print("All order item IDs belong to a single Kafka partition.")

    print("Finding the latest event for each order item...")

    window = (
        Window
        .partitionBy("order_item_id")
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

    print("Writing Order Items Current...")

    (
        current.write
        .mode("overwrite")
        .parquet(CURRENT_PATH)
    )

    result = spark.read.parquet(CURRENT_PATH)

    print("\n========== ORDER ITEMS CURRENT SUMMARY ==========")
    print("Total current order items:", result.count())

    print("\n========== ORDER ITEM QUANTITY SUMMARY ==========")

    result.select(
        F.count("*").alias("total_items"),
        F.sum("quantity").alias("total_units"),
        F.round(F.sum(F.col("quantity") * F.col("unit_price")), 2)
        .alias("total_item_value"),
        F.round(F.avg("unit_price"), 2).alias("average_unit_price")
    ).show(truncate=False)

    print("\n========== CURRENT ORDER ITEM SAMPLE ==========")

    (
        result.select(
            "order_item_id",
            "order_id",
            "product_id",
            "quantity",
            "unit_price"
        )
        .orderBy(F.col("order_item_id").desc())
        .show(10, truncate=False)
    )

    print("\nOrder Items Current created at:", CURRENT_PATH)

    spark.stop()


if __name__ == "__main__":
    main()
