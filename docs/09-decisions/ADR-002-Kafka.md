# ADR-002: Use Kafka for Event Streaming

## Context

StreamForge requires real time processing of business events such as orders, payments, and inventory updates.

The system needs reliable communication between application services and data processing systems.

---

## Decision

Use Apache Kafka as the event streaming platform.

Kafka will handle real time event publishing and consumption.

---

## Alternatives Considered

### RabbitMQ

Benefits:

- Simple message queue.

Limitations:

- Less suitable for large scale event streaming.

### Direct Database Processing

Benefits:

- Simple implementation.

Limitations:

- Creates tight coupling between systems.

---

## Trade Offs

Benefits:

- High throughput.
- Event replay capability.
- Scalable architecture.

Limitations:

- Requires operational management.
- Additional system complexity.

---

## Status

Accepted