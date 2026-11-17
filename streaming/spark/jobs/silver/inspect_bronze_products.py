
from pyspark.sql import SparkSession
from pyspark.sql import functions as F

BRONZE_PATH = "/opt/spark-data/bronze/postgresql/streamforge"


def main():
    spark = (
        SparkSession.builder
        .appName("StreamForge-Inspect-Bronze-Products")
        .getOrCreate()
    )

    spark.sparkContext.setLogLevel("WARN")

    products = (
        spark.read
        .parquet(BRONZE_PATH)
        .filter(F.col("source_table") == "products")
    )

    print("\n========== PRODUCT EVENT COUNTS ==========")

    print("Total product events:", products.count())

    print("\n========== PRODUCT EVENT SAMPLES ==========")

    (
        products
        .select(
            "topic",
            "partition",
            "offset",
            "message_key",
            "message_value"
        )
        .orderBy(F.desc("offset"))
        .show(5, truncate=False, vertical=True)
    )

    spark.stop()


if __name__ == "__main__":
    main()
