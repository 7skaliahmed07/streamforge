from pyspark.sql import SparkSession
from pyspark.sql import functions as F

spark = (
    SparkSession.builder
    .appName("StreamForge-Debug-Silver-Orders")
    .getOrCreate()
)

spark.sparkContext.setLogLevel("WARN")

bronze = (
    spark.read.parquet("/opt/spark-data/bronze/postgresql/streamforge")
    .filter(F.col("source_table") == "orders")
)

debug = bronze.select(
    "offset",
    F.get_json_object("message_value", "$.payload.op").alias("operation"),
    F.get_json_object("message_value", "$.payload.source.table").alias("source_table"),
    F.get_json_object("message_value", "$.payload.after.id").alias("after_id"),
    F.get_json_object("message_value", "$.payload.before.id").alias("before_id"),
    F.get_json_object("message_value", "$.payload.after.total_amount").alias("amount")
)

print("========== JSON EXTRACTION COUNTS ==========")
debug.select(
    F.count("*").alias("bronze_events"),
    F.count("operation").alias("parsed_operations"),
    F.count("source_table").alias("parsed_source_tables"),
    F.count("after_id").alias("parsed_after_ids"),
    F.count("amount").alias("parsed_amounts")
).show(truncate=False)

print("========== SAMPLE EXTRACTED RECORDS ==========")
debug.orderBy(F.col("offset").desc()).show(5, truncate=False)

spark.stop()
