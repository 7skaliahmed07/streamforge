# StreamForge Data Warehouse Design

## 1. Purpose

The StreamForge warehouse transforms retail operational data into a structure that supports reporting and business analysis.

It separates operational workloads from analytical workloads.

## 2. Architecture

The current analytical architecture has three layers.

| Layer | Schema | Purpose |
|---|---|---|
| Silver | silver | Current and cleaned business records produced by Spark |
| Staging | gold_staging | Consistent source models created by dbt |
| Gold | gold | Dimensional models designed for reporting |

The existing analytics schema is separate and is not replaced by this implementation.

## 3. Silver Layer

The PostgreSQL Silver schema contains five tables.

| Table | Primary key | Description |
|---|---|---|
| customers | customer_id | Current customer records |
| products | product_id | Current product records |
| orders | order_id | Current order records |
| order_items | order_item_id | Current order item records |
| payments | payment_id | Current payment records |

Spark Silver produces the current state of each business entity. The initial datasets have been loaded into these PostgreSQL tables.

The current implementation has completed the initial load. Continuous upsert and delete synchronization is still planned.

## 4. dbt Staging Layer

The staging models read from the PostgreSQL Silver schema.

| Model | Source |
|---|---|
| stg_customers | silver.customers |
| stg_products | silver.products |
| stg_orders | silver.orders |
| stg_order_items | silver.order_items |
| stg_payments | silver.payments |

Staging provides consistent column names and prepares data for dimensional modelling.

## 5. Gold Dimensional Model

The Gold layer follows a star schema.

### Dimensions

| Dimension | Grain | Purpose |
|---|---|---|
| dim_customer | One row per customer | Customer attributes |
| dim_product | One row per product | Product attributes |
| dim_date | One row per calendar date | Calendar reporting attributes |

### Facts

| Fact | Grain | Purpose |
|---|---|---|
| fact_sales | One row per order item | Sales quantity and sales amount |
| fact_payment | One row per payment | Payment amount, status and method |

### Relationships

The sales fact connects to customer, product and date dimensions.

The payment fact connects to customer and date dimensions.

Both facts also retain their order identifiers for business analysis.

## 6. Surrogate Keys

The customer and product dimensions currently generate integer keys using ROW_NUMBER ordered by their source identifiers.

This produces unique keys for the current full table builds.

These keys are not guaranteed to remain stable when records are inserted or removed and the dimensions are rebuilt.

A persistent key mapping or another stable key strategy must be implemented before incremental CDC updates are introduced.

The date dimension uses YYYYMMDD as its date key.

## 7. Data Quality

The dimensional models have dbt tests for:

- Primary key uniqueness and non null values.
- Business identifier uniqueness.
- Fact to dimension relationships.
- Required measures and identifiers.
- Date key validity.

The latest complete dbt test run passed all 68 tests.

## 8. Current Limitations

- Spark Silver to PostgreSQL Silver has completed its initial load.
- Continuous upsert and delete propagation is not yet implemented.
- Customer and product surrogate keys need a stable strategy.
- Gold models currently use table materialization and are rebuilt by dbt runs.
- Automated orchestration and Power BI reporting remain future work.

## 9. Next Steps

1. Implement stable dimension keys.
2. Implement idempotent Silver upserts.
3. Propagate source deletes safely.
4. Refresh affected Gold models.
5. Add pipeline orchestration and monitoring.
6. Connect the Gold warehouse to a reporting tool.
