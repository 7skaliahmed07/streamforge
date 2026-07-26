# ADR-001: Use PostgreSQL as Operational Database

## Context

StreamForge requires a reliable database to store transactional business data such as customers, products, orders, and payments.

The application requires consistency, structured data storage, and strong relational capabilities.

---

## Decision

Use PostgreSQL as the primary operational database.

PostgreSQL will store application transaction data and act as the source of truth for operational processes.

---

## Alternatives Considered

### MongoDB

Benefits:

- Flexible document structure.

Limitations:

- Less suitable for highly relational transactional data.

### MySQL

Benefits:

- Popular relational database.

Limitations:

- PostgreSQL provides stronger advanced SQL capabilities.

---

## Trade Offs

Benefits:

- Strong consistency.
- Reliable transactions.
- Powerful SQL support.
- Open source.

Limitations:

- Requires schema management.
- Horizontal scaling requires additional design.

---

## Status

Accepted