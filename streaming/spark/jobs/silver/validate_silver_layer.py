from pyspark.sql import SparkSession
from pyspark.sql import functions as F

BASE = "/opt/spark-data/silver/postgresql/streamforge"

ENTITIES = {
    "customers": ("customers", "customer_id"),
    "products": ("products", "product_id"),
    "orders": ("orders", "order_id"),
    "order_items": ("order_items", "order_item_id"),
    "payments": ("payments", "payment_id"),
}


def main():
    spark = (
        SparkSession.builder
        .appName("StreamForge-Silver-Layer-Validation")
        .getOrCreate()
    )
    spark.sparkContext.setLogLevel("WARN")

    events = {}
    current = {}

    print("\n========== SILVER DATASET COUNTS ==========")

    total_events = 0
    total_current = 0

    for name, (folder, key) in ENTITIES.items():
        events[name] = spark.read.parquet(
            f"{BASE}/{folder}/events_v1"
        )

        current[name] = spark.read.parquet(
            f"{BASE}/{folder}/current_v1"
        )

        event_count = events[name].count()
        current_count = current[name].count()

        total_events += event_count
        total_current += current_count

        print(
            f"{name}: events={event_count}, "
            f"current={current_count}"
        )

    print(f"\nTOTAL EVENTS: {total_events}")
    print(f"TOTAL CURRENT RECORDS: {total_current}")

    print("\n========== PRIMARY KEY VALIDATION ==========")

    for name, (_, key) in ENTITIES.items():
        df = current[name]

        missing = df.filter(F.col(key).isNull()).count()

        duplicates = (
            df.groupBy(key)
            .count()
            .filter(F.col("count") > 1)
            .count()
        )

        print(
            f"{name}: missing_keys={missing}, "
            f"duplicate_keys={duplicates}"
        )

    print("\n========== REFERENTIAL INTEGRITY ==========")

    relationships = [
        ("orders.customer_id", "customers.customer_id",
         current["orders"], "customer_id",
         current["customers"], "customer_id"),

        ("order_items.order_id", "orders.order_id",
         current["order_items"], "order_id",
         current["orders"], "order_id"),

        ("order_items.product_id", "products.product_id",
         current["order_items"], "product_id",
         current["products"], "product_id"),

        ("payments.order_id", "orders.order_id",
         current["payments"], "order_id",
         current["orders"], "order_id"),
    ]

    for label, _, child, child_key, parent, parent_key in relationships:
        child_ids = (
            child
            .filter(F.col(child_key).isNotNull())
            .select(F.col(child_key).alias("relationship_id"))
        )

        parent_ids = (
            parent
            .filter(F.col(parent_key).isNotNull())
            .select(F.col(parent_key).alias("relationship_id"))
            .distinct()
        )

        invalid = (
            child_ids
            .join(parent_ids, "relationship_id", "left_anti")
            .count()
        )

        print(f"{label}: unmatched_records={invalid}")

    print("\n========== SILVER VALIDATION FINISHED ==========")

    spark.stop()


if __name__ == "__main__":
    main()
