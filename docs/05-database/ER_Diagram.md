# Entity Relationship Diagram

## Document Information

| Item | Value |
|------|-------|
| Project | StreamForge |
| Version | 1.0 |
| Author | <Your Name> |
| Status | Draft |
| Created | 2026-07-26 |
| Last Updated | 2026-07-26 |

---

# Purpose

This document describes the relationship between the main entities in the StreamForge operational database.

The ER diagram provides a visual representation of how business data is connected.

---

# Database Entities

The StreamForge operational database contains the following entities:

- Customer
- Product
- Order
- Order Item
- Payment
- Inventory

---

# ER Diagram

mermaid
erDiagram

    CUSTOMER ||--o{ ORDER : places

    ORDER ||--|{ ORDER_ITEM : contains

    PRODUCT ||--o{ ORDER_ITEM : included_in

    ORDER ||--|| PAYMENT : has

    PRODUCT ||--|| INVENTORY : maintains


    CUSTOMER {
        int customer_id PK
        string name
        string email
        string phone
        datetime created_date
    }


    PRODUCT {
        int product_id PK
        string product_name
        string category
        decimal price
        datetime created_date
    }


    ORDER {
        int order_id PK
        int customer_id FK
        datetime order_date
        string status
        decimal total_amount
    }


    ORDER_ITEM {
        int order_item_id PK
        int order_id FK
        int product_id FK
        int quantity
        decimal price
    }


    PAYMENT {
        int payment_id PK
        int order_id FK
        string payment_method
        string payment_status
        datetime payment_date
    }


    INVENTORY {
        int inventory_id PK
        int product_id FK
        int available_quantity
        datetime updated_date
    }


---

# Relationship Explanation

## Customer and Order

A customer can create multiple orders.

Relationship:


Customer 1 → Many Orders


---

## Order and Order Item

An order contains one or more products.

Relationship:


Order 1 → Many Order Items


---

## Product and Order Item

A product can exist in many orders.

Relationship:


Product 1 → Many Order Items


---

## Order and Payment

Each order has a payment record.

Relationship:


Order 1 → 1 Payment


---

## Product and Inventory

Each product has inventory information.

Relationship:


Product 1 → 1 Inventory


---

# Design Notes

The database design follows relational database principles:

* Primary keys uniquely identify records.
* Foreign keys maintain relationships.
* Transaction data remains normalized.
* Data integrity is enforced at the database level.

---

# Future Improvements

Future database enhancements:

* Add audit history tables.
* Add soft delete support.
* Add indexing strategy documentation.
* Add database migration process.

