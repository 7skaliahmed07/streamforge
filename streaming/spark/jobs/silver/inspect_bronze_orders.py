from pyspark.sql import SparkSession
from pyspark.sql import functions as F

BRONZE_PATH = "/opt/spark-data/bronze/postgresql/streamforge"

spark = (
    SparkSession.builder
    .appName("StreamForge-Inspect-Bronze-Orders")
    .getOrCreate()
)

spark.sparkContext.setLogLevel("WARN")

print("Reading Bronze orders...")

orders = (
    spark.read.parquet(BRONZE_PATH)
    .filter(F.col("source_table") == "orders")
)

print("\n========== ORDER EVENT COUNT ==========")
print("Total events:", orders.count())

print("\n========== ORDER OPERATIONS ==========")

(
    orders
    .withColumn(
        "payload",
        F.from_json(
            F.col("message_value"),
            "STRUCT<payload: STRUCT<op: STRING, source: STRUCT<snapshot: STRING>>>"
        ).getField("payload")
    )
    .groupBy(
        F.col("payload.op").alias("operation"),
        F.col("payload.source.snapshot").alias("snapshot_type")
    )
    .count()
    .show(truncate=False)
)

print("\n========== ORDER EVENT SAMPLES ==========")

(
    orders
    .orderBy(F.col("offset").desc())
    .select(
        "topic",
        "partition",
        "offset",
        "kafka_timestamp",
        "message_key",
        "message_value"
    )
    .show(3, truncate=False, vertical=True)
)

spark.stop()
