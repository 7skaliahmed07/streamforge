
from pyspark.sql import SparkSession
from pyspark.sql import functions as F
from pyspark.sql.window import Window

EVENTS_PATH = (
    "/opt/spark-data/silver/postgresql/streamforge/"
    "customers/events_v1"
)

CURRENT_PATH = (
    "/opt/spark-data/silver/postgresql/streamforge/"
    "customers/current_v1"
)


def main():
    spark = (
        SparkSession.builder
        .appName("StreamForge-Silver-Customer-Current")
        .getOrCreate()
    )

    spark.sparkContext.setLogLevel("WARN")

    print("Reading Silver customer events...")

    events = spark.read.parquet(EVENTS_PATH)

    # Order each customer's events by Kafka partition
    # and offset. Events for the same Kafka key retain
    # their partition ordering.
    customer_window = (
        Window
        .partitionBy("customer_id")
        .orderBy(
            F.col("offset").desc(),
            F.col("kafka_timestamp").desc()
        )
    )

    print("Selecting the latest event per customer...")

    latest_events = (
        events
        .withColumn(
            "row_number",
            F.row_number().over(customer_window)
        )
        .filter(F.col("row_number") == 1)
        .drop("row_number")
    )

    # A latest delete means the customer is no longer active.
    current_customers = latest_events.filter(
        F.col("operation") != "d"
    )

    print("Writing current customer state...")

    (
        current_customers
        .write
        .mode("overwrite")
        .parquet(CURRENT_PATH)
    )

    print("\n========== CUSTOMER CURRENT STATE ==========")

    print("Total current customers:", current_customers.count())

    print("\n========== CUSTOMER SAMPLE ==========")

    current_customers.select(
        "customer_id",
        "first_name",
        "last_name",
        "city",
        "country",
        "customer_segment",
        "operation"
    ).orderBy("customer_id").show(
        10,
        truncate=False
    )

    print("\nCurrent customer data written to:", CURRENT_PATH)

    spark.stop()


if __name__ == "__main__":
    main()
