from pyspark.sql import SparkSession
from pyspark.sql import functions as F

spark = (
    SparkSession.builder
    .appName("StreamForge-Inspect-Bronze-Payments")
    .getOrCreate()
)

spark.sparkContext.setLogLevel("WARN")

bronze = (
    spark.read.parquet("/opt/spark-data/bronze/postgresql/streamforge")
    .filter(F.col("source_table") == "payments")
)

print("\n========== PAYMENT EVENT SUMMARY ==========")
print("Total events:", bronze.count())

(
    bronze
    .withColumn(
        "operation",
        F.get_json_object("message_value", "$.payload.op")
    )
    .withColumn(
        "snapshot_type",
        F.get_json_object("message_value", "$.payload.source.snapshot")
    )
    .groupBy("operation", "snapshot_type")
    .count()
    .orderBy("operation")
    .show(truncate=False)
)

print("\n========== PAYMENT JSON SAMPLES ==========")

samples = bronze.select(
    "offset",
    "partition",
    F.get_json_object(
        "message_value", "$.payload.op"
    ).alias("operation"),
    F.get_json_object(
        "message_value", "$.payload.after"
    ).alias("after"),
    F.get_json_object(
        "message_value", "$.payload.before"
    ).alias("before")
)

samples.orderBy(F.col("offset").desc()).show(
    5,
    truncate=False
)

spark.stop()
