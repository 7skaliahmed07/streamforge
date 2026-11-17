
from pyspark.sql import SparkSession
from pyspark.sql import functions as F

SILVER_PATH = (
    "/opt/spark-data/silver/postgresql/streamforge/"
    "customers/events_v1"
)


def main():
    spark = (
        SparkSession.builder
        .appName("StreamForge-Validate-Silver-Customers")
        .getOrCreate()
    )

    spark.sparkContext.setLogLevel("WARN")

    df = spark.read.parquet(SILVER_PATH)

    print("\n========== CUSTOMER EVENT QUALITY ==========")

    print("Total events:", df.count())

    print(
        "Unique customer IDs:",
        df.select("customer_id").distinct().count()
    )

    print(
        "Events without customer ID:",
        df.filter(F.col("customer_id").isNull()).count()
    )

    print("\n========== REPEATED CUSTOMER IDs ==========")

    (
        df.groupBy("customer_id")
        .count()
        .filter(F.col("count") > 1)
        .orderBy(F.desc("count"))
        .show(10, truncate=False)
    )

    print("\n========== LIVE CDC EVENTS ==========")

    (
        df.filter(F.col("operation") != "r")
        .select(
            "customer_id",
            "operation",
            "city",
            "source_lsn",
            "transaction_id",
            "partition",
            "offset",
            "kafka_timestamp"
        )
        .orderBy("offset")
        .show(20, truncate=False)
    )

    print("\n========== CUSTOMER EVENT VALIDATION COMPLETE ==========")

    spark.stop()


if __name__ == "__main__":
    main()
