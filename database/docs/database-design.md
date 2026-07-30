# StreamForge Database

## Overview

The StreamForge transactional database is built on PostgreSQL.

It models a modern retail platform using a normalized relational schema.

---

## Tables

### Customers

Purpose:
Stores customer profile information.

Primary Key

- id

Relationships

- One customer can place many orders.

---

### Orders

Purpose:
Stores customer purchases.

Primary Key

- id

Foreign Keys

- customer_id → customers.id

---

### Order Items

Purpose

Stores products within each order.

Relationships

orders 1 ---- * order_items

products 1 --- * order_items

---

### Products

Stores product catalog.

---

### Inventory

Tracks warehouse inventory.

---

### Payments

Stores payment transactions.