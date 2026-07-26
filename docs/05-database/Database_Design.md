# Database Design

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

This document describes the database design for StreamForge.

It defines the operational data model used by the application to store transactional business information.

---

# Database Overview

StreamForge uses PostgreSQL as the operational database.

The database stores core business entities including:

- Customers
- Products
- Orders
- Payments
- Inventory

The database is optimized for transactional workloads.

---

# Database Design Principles

The database follows these principles:

- Maintain data consistency.
- Avoid unnecessary duplication.
- Use clear relationships between entities.
- Support application scalability.
- Maintain data integrity.

---

# Entity Overview

## Customer

Purpose:

Stores customer information.

Main attributes:

- Customer ID
- Name
- Email
- Phone
- Address
- Created Date


---

## Product

Purpose:

Stores product information.

Main attributes:

- Product ID
- Product Name
- Category
- Price
- Stock Quantity
- Created Date


---

## Order

Purpose:

Stores customer purchase transactions.

Main attributes:

- Order ID
- Customer ID
- Order Date
- Order Status
- Total Amount


---

## Order Item

Purpose:

Stores products included in an order.

Main attributes:

- Order Item ID
- Order ID
- Product ID
- Quantity
- Price


---

## Payment

Purpose:

Stores payment information.

Main attributes:

- Payment ID
- Order ID
- Payment Method
- Payment Status
- Payment Date


---

## Inventory

Purpose:

Stores product inventory information.

Main attributes:

- Inventory ID
- Product ID
- Available Quantity
- Last Updated


---

# Entity Relationships

The main relationships are:

Customer

One Customer can have many Orders.



Customer 1 ---- N Order




Order

One Order can contain many Order Items.



Order 1 ---- N Order Item




Product

One Product can appear in many Order Items.



Product 1 ---- N Order Item




Order

One Order can have one Payment.



Order 1 ---- 1 Payment




Product

One Product has one Inventory record.



Product 1 ---- 1 Inventory



---

# Database Flow

Application flow:

1. User creates an order.

2. Backend validates order information.

3. Order data is stored in PostgreSQL.

4. Business event is published to Kafka.

5. Data pipeline processes the event.

6. Analytical data is stored in warehouse.

---

# Future Improvements

Possible improvements:

- Database indexing optimization.
- Read replicas.
- Database migration automation.
- Advanced partitioning strategies.

