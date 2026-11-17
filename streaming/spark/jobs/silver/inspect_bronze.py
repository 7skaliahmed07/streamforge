
from pyspark.sql import SparkSession
from pyspark.sql import functions as F

BRONZE_PATH = "/opt/spark-data/bronze/postgresql/streamforge"


def main():
    spark = (
        SparkSession.builder
        .appName("StreamForge-Inspect-Bronze")
        .getOrCreate()
    )

    spark.sparkContext.setLogLevel("WARN")

    print("\n========== BRONZE SCHEMA ==========")

    bronze_df = spark.read.parquet(BRONZE_PATH)

    bronze_df.printSchema()

    print("\n========== AVAILABLE SOURCE TABLES ==========")

    (
        bronze_df
        .select("source_table")
        .distinct()
        .orderBy("source_table")
        .show(truncate=False)
    )

    print("\n========== CUSTOMER EVENTS ==========")

    customer_events = (
        bronze_df
        .filter(F.col("source_table") == "customers")
        .select(
            "topic",
            "partition",
            "offset",
            "kafka_timestamp",
            "message_key",
            "message_value"
        )
        .orderBy(F.desc("offset"))
        .limit(5)
    )

    customer_events.show(
        n=5,
        truncate=False,
        vertical=True
    )

    spark.stop()


if __name__ == "__main__":
    main()
