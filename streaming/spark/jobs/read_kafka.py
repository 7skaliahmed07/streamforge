from pyspark.sql import SparkSession
from pyspark.sql.functions import col

spark = (
    SparkSession.builder
    .appName("StreamForge-Kafka-Reader")
    .getOrCreate()
)

spark.sparkContext.setLogLevel("WARN")

# Read customer change events from Kafka
kafka_stream = (
    spark.readStream
    .format("kafka")
    .option("kafka.bootstrap.servers", "streamforge-kafka:9092")
    .option("subscribe", "streamforge.public.customers")
    .option("startingOffsets", "earliest")
    .load()
)

# Convert Kafka binary fields into readable strings
readable_stream = kafka_stream.select(
    col("topic"),
    col("partition"),
    col("offset"),
    col("timestamp"),
    col("key").cast("string").alias("key"),
    col("value").cast("string").alias("value")
)

# Print incoming events to the console
query = (
    readable_stream.writeStream
    .format("console")
    .outputMode("append")
    .option("truncate", "false")
    .option(
        "checkpointLocation",
        "/opt/spark-apps/checkpoints/customers"
    )
    .start()
)

query.awaitTermination()
