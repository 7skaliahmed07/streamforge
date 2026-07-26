# ADR-004: Use Data Warehouse for Analytics

## Context

Business users require fast analytical queries and historical reporting.

Operational databases are not optimized for analytics workloads.

---

## Decision

Use a dedicated data warehouse for analytical workloads.

The warehouse will store transformed business data for reporting.

---

## Alternatives Considered

### Direct Database Reporting

Benefits:

- Simple setup.

Limitations:

- Impacts application performance.

### Data Lake Only

Benefits:

- Stores large volumes of raw data.

Limitations:

- Requires additional processing for analytics.

---

## Trade Offs

Benefits:

- Fast analytical queries.
- Historical analysis.
- Better reporting performance.

Limitations:

- Additional storage layer.

---

## Status

Accepted