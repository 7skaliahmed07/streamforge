# Data Flow Architecture

## Document Information

| Item         | Value       |
| ------------ | ----------- |
| Project      | StreamForge |
| Version      | 1.0         |
| Author       | Uzair       |
| Status       | Draft       |
| Created      | 2026-07-26  |
| Last Updated | 2026-07-26  |

---

# Purpose

This document explains how data moves through StreamForge from the moment a business event is created until it becomes an analytical insight.

The purpose is to describe the complete end to end data pipeline.

---

# Data Flow Overview

StreamForge follows an event driven data architecture.

The complete flow:
User Action

↓

React Frontend

↓

Node.js Express API

↓

PostgreSQL Database

↓

Kafka Event Streaming

↓

Spark Data Processing

↓

Data Warehouse

↓

Power BI Dashboard

---

# Step 1: User Interaction

The process begins when a user performs an action.

Examples:

- Customer places an order.
- Customer makes a payment.
- Inventory quantity changes.

The React frontend captures the user action and sends a request to the backend API.

---

# Step 2: Backend Processing

The Node.js Express API receives the request.

Responsibilities:

- Validate incoming data.
- Apply business rules.
- Authenticate the user.
- Process the business operation.

Example:

A customer creates a new order.

The backend validates:

- Customer information.
- Product availability.
- Order details.

---

# Step 3: Transaction Storage

After successful validation, the backend stores the transaction data in PostgreSQL.

Example:

Order information:
Order ID
Customer ID
Product ID
Quantity
Price
Created Date

PostgreSQL acts as the operational source of truth.

---

# Step 4: Event Publishing

After storing the transaction, the backend publishes an event to Kafka.

Example event:
Order Created Event

{
orderId: 1001,
customerId: 500,
amount: 250
}

Kafka provides reliable communication between application services and data processing systems.

---

# Step 5: Stream Processing

Apache Spark consumes events from Kafka.

Spark performs:

- Data validation.
- Data cleaning.
- Data transformation.
- Data enrichment.

Example:

Raw event:
Order Created
Amount: 250

Processed data:

Daily Sales Record

Date
Customer Segment
Product Category
Revenue

---

# Step 6: Data Warehouse Storage

Processed data is loaded into the analytical warehouse.

The warehouse stores data optimized for reporting and analysis.

Example:

Fact Tables:

- Fact Orders.
- Fact Payments.

Dimension Tables:

- Customer.
- Product.
- Date.

---

# Step 7: Business Intelligence

Power BI connects to the warehouse.

Business users can view:

Sales Dashboard:

- Revenue trends.
- Order volume.
- Sales performance.

Customer Dashboard:

- Customer growth.
- Customer behavior.

Inventory Dashboard:

- Product availability.
- Stock movement.

---

# Real Time Processing Flow

StreamForge supports near real time analytics:
Event Created

↓

Kafka

↓

Spark Processing

↓

Warehouse Update

↓

Dashboard Refresh

This enables business teams to make decisions using fresh data.

---

# Error Handling Flow

If processing fails:

1. Error is logged.

2. Failed events are tracked.

3. Processing can be retried.

4. Monitoring alerts are generated.

---

# Data Quality Checks

The pipeline performs validation at multiple stages:

## API Layer

Checks:

- Required fields.
- Data format.
- Business rules.

## Processing Layer

Checks:

- Duplicate records.
- Invalid values.
- Missing information.

## Warehouse Layer

Checks:

- Data consistency.
- Reporting accuracy.

---

# Design Benefits

This architecture provides:

- Real time data processing.
- Reliable event communication.
- Scalable data pipelines.
- Better business visibility.
- Separation between operational and analytical workloads.

---

# Future Improvements

Possible improvements:

- Add data lake storage.
- Implement machine learning pipelines.
- Add automated data quality monitoring.
- Add cloud based streaming infrastructure.
