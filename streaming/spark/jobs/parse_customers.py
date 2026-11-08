
from pyspark.sql import SparkSession
from pyspark.sql.functions import (
    col,
    coalesce,
    from_json,
    when,
)
from pyspark.sql.types import (
    StructType,
    StructField,
    StringType,
    IntegerType,
    LongType,
)

spark = (
    SparkSession.builder
    .appName("StreamForge-Customer-CDC-Parser")
    .getOrCreate()
)

spark.sparkContext.setLogLevel("WARN")

# Customer record structure
customer_schema = StructType([
    StructField("id", IntegerType(), True),
    StructField("first_name", StringType(), True),
    StructField("last_name", StringType(), True),
    StructField("email", StringType(), True),
    StructField("phone", StringType(), True),
    StructField("created_at", LongType(), True),
    StructField("updated_at", LongType(), True),
    StructField("city", StringType(), True),
    StructField("postal_code", StringType(), True),
    StructField("country", StringType(), True),
    StructField("customer_segment", StringType(), True),
])

# Debezium source metadata
source_schema = StructType([
    StructField("version", StringType(), True),
    StructField("connector", StringType(), True),
    StructField("name", StringType(), True),
    StructField("ts_ms", LongType(), True),
    StructField("snapshot", StringType(), True),
    StructField("db", StringType(), True),
    StructField("schema", StringType(), True),
    StructField("table", StringType(), True),
    StructField("lsn", LongType(), True),
])

# Debezium event payload
payload_schema = StructType([
    StructField("before", customer_schema, True),
    StructField("after", customer_schema, True),
    StructField("source", source_schema, True),
    StructField("op", StringType(), True),
    StructField("ts_ms", LongType(), True),
])

value_schema = StructType([
    StructField("payload", payload_schema, True),
])

key_schema = StructType([
    StructField(
        "payload",
        StructType([
            StructField("id", IntegerType(), True)
        ]),
        True,
    )
])

# Read customer CDC events from Kafka
kafka_stream = (
    spark.readStream
    .format("kafka")
    .option("kafka.bootstrap.servers", "streamforge-kafka:9092")
    .option("subscribe", "streamforge.public.customers")
    .option("startingOffsets", "earliest")
    .load()
)

# Parse Kafka key and Debezium value
parsed_stream = kafka_stream.select(
    from_json(col("key").cast("string"), key_schema).alias("key_data"),
    from_json(col("value").cast("string"), value_schema).alias("event"),
    col("topic"),
    col("partition"),
    col("offset"),
    col("timestamp").alias("kafka_timestamp"),
)

# Extract the Debezium payload
payload = col("event.payload")

# Identify the CDC operation
operation = payload.op

operation_name = (
    when(operation == "r", "snapshot")
    .when(operation == "c", "insert")
    .when(operation == "u", "update")
    .when(operation == "d", "delete")
    .otherwise("unknown")
)

# Extract customer details from after or before
customer_changes = parsed_stream.select(
    col("topic"),
    col("partition"),
    col("offset"),
    col("kafka_timestamp"),

    coalesce(
        payload.after.id,
        payload.before.id,
        col("key_data.payload.id"),
    ).alias("customer_id"),

    operation.alias("operation"),
    operation_name.alias("operation_name"),
    (operation == "d").alias("is_deleted"),

    payload.before.city.alias("previous_city"),
    payload.after.city.alias("current_city"),

    coalesce(
        payload.after.city,
        payload.before.city,
    ).alias("record_city"),

    coalesce(
        payload.after.country,
        payload.before.country,
    ).alias("country"),

    coalesce(
        payload.after.customer_segment,
        payload.before.customer_segment,
    ).alias("customer_segment"),

    payload.source.db.alias("source_database"),
    payload.source.table.alias("source_table"),
    payload.source.ts_ms.alias("source_timestamp"),
    payload.ts_ms.alias("event_timestamp"),
).where(payload.isNotNull())

# Display structured customer CDC events
query = (
    customer_changes.writeStream
    .format("console")
    .outputMode("append")
    .option("truncate", "false")
    .option(
        "checkpointLocation",
        "/opt/spark-apps/checkpoints/customers_parsed_v2"
    )
    .start()
)

query.awaitTermination()
