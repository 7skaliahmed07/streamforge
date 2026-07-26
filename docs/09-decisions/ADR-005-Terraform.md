# ADR-005: Use Terraform for Infrastructure Management

## Context

StreamForge requires repeatable infrastructure setup across environments.

Manual infrastructure configuration can create inconsistencies.

---

## Decision

Use Terraform for infrastructure as code.

Infrastructure configuration will be version controlled and automated.

---

## Alternatives Considered

### Manual Configuration

Benefits:

- Simple initially.

Limitations:

- Difficult to reproduce.

### Cloud Specific Templates

Benefits:

- Native cloud integration.

Limitations:

- Vendor lock in.

---

## Trade Offs

Benefits:

- Repeatable deployments.
- Infrastructure version control.
- Automation support.

Limitations:

- Requires learning infrastructure concepts.

---

## Status

Accepted