from pyspark.sql import SparkSession
from pyspark.sql import functions as F


# Kafka configuration
KAFKA_BOOTSTRAP_SERVERS = "streamforge-kafka:9092"

KAFKA_TOPIC_PATTERN = (
    r"^streamforge\.public\."
    r"(customers|products|orders|order_items|payments)$"
)

# Bronze storage configuration
BRONZE_PATH = "/opt/spark-data/bronze/postgresql/streamforge"

# Persistent Spark checkpoint
CHECKPOINT_PATH = (
    "/opt/spark-apps/checkpoints/bronze_ingestion_v1"
)


def create_spark_session():
    return (
        SparkSession.builder
        .appName("StreamForge-Bronze-Ingestion")
        .getOrCreate()
    )


def read_kafka_stream(spark):
    return (
        spark.readStream
        .format("kafka")
        .option("kafka.bootstrap.servers", KAFKA_BOOTSTRAP_SERVERS)
        .option("subscribePattern", KAFKA_TOPIC_PATTERN)
        .option("startingOffsets", "earliest")
        .load()
    )


def prepare_bronze_records(kafka_stream):
    return kafka_stream.select(
        F.col("topic"),
        F.col("partition"),
        F.col("offset"),
        F.col("timestamp").alias("kafka_timestamp"),
        F.col("key").cast("string").alias("message_key"),
        F.col("value").cast("string").alias("message_value"),
    ).withColumn(
        "source_table",
        F.regexp_extract(
            F.col("topic"),
            r"^streamforge\.public\.([^.]+)$",
            1,
        ),
    ).withColumn(
        "event_date",
        F.date_format(F.col("kafka_timestamp"), "yyyy-MM-dd"),
    )


def write_bronze_stream(bronze_records):
    return (
        bronze_records.writeStream
        .format("parquet")
        .outputMode("append")
        .option("path", BRONZE_PATH)
        .option("checkpointLocation", CHECKPOINT_PATH)
        .partitionBy("source_table", "event_date")
        .trigger(processingTime="10 seconds")
        .start()
    )


def main():
    spark = create_spark_session()

    spark.sparkContext.setLogLevel("WARN")

    print("Starting StreamForge Bronze ingestion...")
    print("Kafka broker:", KAFKA_BOOTSTRAP_SERVERS)
    print("Bronze destination:", BRONZE_PATH)

    kafka_stream = read_kafka_stream(spark)

    bronze_records = prepare_bronze_records(kafka_stream)

    query = write_bronze_stream(bronze_records)

    print("Bronze ingestion is running.")

    query.awaitTermination()


if __name__ == "__main__":
    main()
