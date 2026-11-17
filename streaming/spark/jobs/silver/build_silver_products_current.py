from pyspark.sql import SparkSession
from pyspark.sql import functions as F
from pyspark.sql.window import Window

SILVER_EVENTS_PATH = (
    "/opt/spark-data/silver/postgresql/streamforge/products/events_v1"
)

SILVER_CURRENT_PATH = (
    "/opt/spark-data/silver/postgresql/streamforge/products/current_v1"
)


def main():
    spark = (
        SparkSession.builder
        .appName("StreamForge-Silver-Products-Current")
        .getOrCreate()
    )

    spark.sparkContext.setLogLevel("WARN")

    print("Reading Silver product events...")

    events = spark.read.parquet(SILVER_EVENTS_PATH)

    # Verify that each product key belongs to one Kafka partition.
    partition_check = (
        events.groupBy("product_id")
        .agg(F.countDistinct("partition").alias("partition_count"))
        .filter(F.col("partition_count") > 1)
    )

    if partition_check.limit(1).count() > 0:
        raise ValueError(
            "A product ID was found in multiple Kafka partitions. "
            "Offset ordering alone cannot determine its latest event."
        )

    print("Checking product event ordering...")

    window = (
        Window
        .partitionBy("product_id")
        .orderBy(
            F.col("offset").desc(),
            F.col("kafka_timestamp").desc()
        )
    )

    latest_events = (
        events
        .withColumn("row_number", F.row_number().over(window))
        .filter(F.col("row_number") == 1)
        .drop("row_number")
    )

    # Remove products whose latest event represents a deletion.
    current_products = latest_events.filter(
        F.col("operation") != "d"
    )

    print("Writing Silver product current state...")

    (
        current_products.write
        .mode("overwrite")
        .parquet(SILVER_CURRENT_PATH)
    )

    result = spark.read.parquet(SILVER_CURRENT_PATH)

    print("\n========== SILVER PRODUCT CURRENT SUMMARY ==========")
    print("Total current products:", result.count())

    print("\n========== PRODUCT CURRENT STATE SAMPLE ==========")

    (
        result
        .select(
            "product_id",
            "product_name",
            "category",
            "brand",
            "price",
            "currency",
            "vat_percentage",
            "operation"
        )
        .orderBy("product_id")
        .show(10, truncate=False)
    )

    print("\nSilver product current state created at:")
    print(SILVER_CURRENT_PATH)

    spark.stop()


if __name__ == "__main__":
    main()
