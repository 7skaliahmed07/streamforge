# ADR-004: Use a Layered Data Warehouse

## Status

Accepted

## Context

Retail operational databases are designed for application transactions. Business reporting requires consistent analytical structures and efficient queries across customers, products, orders and payments.

Using operational tables directly for every analytical query can increase workload on the application database and makes analytical modelling harder to maintain.

## Decision

StreamForge uses a layered analytical architecture.

The architecture consists of:

1. Bronze for raw CDC event storage.
2. Spark Silver for cleaned current state datasets.
3. PostgreSQL Silver for relational access to current state data.
4. dbt staging for consistent source models.
5. dbt Gold for dimensional reporting models.

The Gold layer follows a star schema.

It currently contains customer, product and date dimensions, together with sales and payment facts.

The existing analytics schema is kept separate from the new Gold schema.

## Alternatives Considered

### Direct Operational Database Reporting

Benefits:

- Simple architecture.
- Fewer data layers.

Limitations:

- Analytical queries compete with application workloads.
- Reporting logic can become difficult to maintain.

### Data Lake Only

Benefits:

- Flexible storage.
- Suitable for raw and large scale data.

Limitations:

- Additional modelling is needed for business reporting.
- Business users need a suitable analytical access layer.

## Trade Offs

Benefits:

- Clear separation of operational and analytical workloads.
- Reusable transformation logic.
- Dimensional models for reporting.
- A foundation for future BI dashboards.

Limitations:

- More infrastructure and operational complexity.
- Data synchronization and orchestration must be maintained.
- Stable dimension keys are required for reliable incremental processing.

## Current Implementation

The initial PostgreSQL Silver load, dbt staging models and Gold dimensional models have been implemented.

The latest complete dbt test run passed 68 tests.

Continuous Silver synchronization, stable customer and product dimension keys, automated orchestration and BI integration remain future work.
