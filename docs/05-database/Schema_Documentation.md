# Database Schema Documentation

## Document Information

| Item | Value |
|------|-------|
| Project | StreamForge |
| Version | 1.0 |
| Author | Uzair |
| Status | Draft |
| Created | 2026-07-26 |
| Last Updated | 2026-07-26 |

---

# Purpose

This document describes the PostgreSQL database schema used by StreamForge.

It defines tables, columns, relationships, and constraints required for the operational database.

---

# Database Schema Overview

The operational database contains the following tables:

| Table | Purpose |
|------|---------|
| customers | Stores customer information |
| products | Stores product information |
| orders | Stores customer orders |
| order_items | Stores products inside orders |
| payments | Stores payment information |
| inventory | Stores product stock information |

---

# Table Definitions

## customers

Purpose:

Stores customer details.

Columns:

| Column | Type | Constraint |
|--------|------|------------|
| customer_id | SERIAL | Primary Key |
| name | VARCHAR | Not Null |
| email | VARCHAR | Unique |
| phone | VARCHAR | Nullable |
| created_at | TIMESTAMP | Default Current Time |

---

## products

Purpose:

Stores product information.

Columns:

| Column | Type | Constraint |
|--------|------|------------|
| product_id | SERIAL | Primary Key |
| product_name | VARCHAR | Not Null |
| category | VARCHAR | Not Null |
| price | DECIMAL | Not Null |
| created_at | TIMESTAMP | Default Current Time |

---

## orders

Purpose:

Stores customer order transactions.

Columns:

| Column | Type | Constraint |
|--------|------|------------|
| order_id | SERIAL | Primary Key |
| customer_id | INT | Foreign Key |
| order_status | VARCHAR | Not Null |
| total_amount | DECIMAL | Not Null |
| created_at | TIMESTAMP | Default Current Time |

Relationship:



orders.customer_id

references

customers.customer_id



---

## order_items

Purpose:

Stores individual products within an order.

Columns:

| Column | Type | Constraint |
|--------|------|------------|
| order_item_id | SERIAL | Primary Key |
| order_id | INT | Foreign Key |
| product_id | INT | Foreign Key |
| quantity | INT | Not Null |
| price | DECIMAL | Not Null |

Relationships:



order_items.order_id

references

orders.order_id

order_items.product_id

references

products.product_id



---

## payments

Purpose:

Stores payment transactions.

Columns:

| Column | Type | Constraint |
|--------|------|------------|
| payment_id | SERIAL | Primary Key |
| order_id | INT | Foreign Key |
| payment_method | VARCHAR | Not Null |
| payment_status | VARCHAR | Not Null |
| payment_date | TIMESTAMP | Default Current Time |

Relationship:



payments.order_id

references

orders.order_id



---

## inventory

Purpose:

Stores current product inventory.

Columns:

| Column | Type | Constraint |
|--------|------|------------|
| inventory_id | SERIAL | Primary Key |
| product_id | INT | Foreign Key |
| quantity_available | INT | Not Null |
| updated_at | TIMESTAMP | Default Current Time |

Relationship:



inventory.product_id

references

products.product_id



---

# Database Constraints

The database enforces:

## Primary Keys

Every table has a unique identifier.

## Foreign Keys

Relationships between entities are maintained.

## Unique Constraints

Customer emails must be unique.

## Not Null Constraints

Required business information cannot be empty.

---

# Indexing Strategy

Initial indexes:

| Table | Column | Reason |
|------|--------|--------|
| customers | email | Faster customer lookup |
| orders | customer_id | Faster order retrieval |
| order_items | order_id | Faster order details lookup |
| products | category | Faster product filtering |

---

# Migration Strategy

Database changes will be managed through version controlled migrations.

Example:



database/

migrations/

001_create_customers.sql

002_create_products.sql

003_create_orders.sql



---

# Future Improvements

Future database improvements:

- Add database partitioning.
- Add read replicas.
- Add advanced indexing.
- Add automated migration pipeline.


---
