# StreamForge Data Flow

## Overview

StreamForge moves retail data from an operational PostgreSQL database into analytical models.

## Current and Planned Flow

```text
Operational PostgreSQL
          |
          v
       Debezium
          |
          v
         Kafka
          |
          v
   Spark Structured Streaming
          |
          v
      Bronze Parquet
          |
          v
      Spark Silver
          |
          v
  PostgreSQL Silver Schema
          |
          v
      dbt Staging
          |
          v
      dbt Gold
          |
          v
   Business Intelligence
```

## Layer Responsibilities

### Operational PostgreSQL

Stores application records such as customers, products, orders, order items and payments.

### Debezium and Kafka

Debezium captures PostgreSQL change events and publishes them to Kafka topics.

Kafka provides the event transport layer.

### Bronze

Bronze stores raw CDC event envelopes in Parquet format. The raw events are retained for further processing and inspection.

### Spark Silver

Spark interprets CDC events, handles data types and creates current state datasets for the five business entities.

### PostgreSQL Silver

The Silver schema stores the initial current state datasets for analytical consumption.

The initial loads are complete. Continuous synchronization is still planned.

### dbt Staging

dbt reads the Silver tables and creates consistent staging views.

### dbt Gold

dbt creates dimensions and facts for analytical queries and reporting.

### Business Intelligence

The Gold warehouse is intended to support business dashboards and reporting.

## Current Implementation Status

| Component | Status |
|---|---|
| Operational PostgreSQL | Implemented |
| Debezium CDC capture | Implemented |
| Kafka event transport | Implemented |
| Bronze ingestion | Implemented |
| Spark Silver processing | Implemented |
| Initial PostgreSQL Silver load | Implemented |
| Continuous Silver synchronization | Planned |
| dbt staging | Implemented |
| Gold dimensional models | Implemented |
| dbt data tests | 68 passing |
| Automated orchestration | Planned |
| BI dashboard integration | Planned |

## Important Distinction

The pipeline currently demonstrates CDC capture and processing through Spark Silver, followed by an initial load into PostgreSQL Silver.

It does not yet provide fully automated continuous synchronization from Spark Silver through Gold.
