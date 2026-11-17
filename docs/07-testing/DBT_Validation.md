# dbt Validation

## Purpose

This document records the validation of the StreamForge staging and Gold dimensional models.

## Models

The project currently contains 14 dbt models.

The staging layer contains five models:

- stg_customers
- stg_products
- stg_orders
- stg_order_items
- stg_payments

The Gold layer contains the existing business marts and the dimensional models:

- dim_customer
- dim_product
- dim_date
- fact_sales
- fact_payment

## Test Coverage

The tests cover:

- Required values.
- Unique identifiers.
- Dimension key uniqueness.
- Fact grain uniqueness.
- Fact to dimension relationships.
- Required measures.
- Source and model relationships.

## Latest Validation Result

The latest complete dbt test run reported:

| Result | Count |
|---|---:|
| Passed | 68 |
| Warnings | 0 |
| Errors | 0 |
| Skipped | 0 |
| Total | 68 |

## Fact Grain

Sales fact contains one row per order item.

Payment fact contains one row per payment.

These grains are validated using unique and non null tests on the business identifiers.

## Important Limitation

Passing tests confirms the current datasets satisfy the configured tests. It does not prove that surrogate keys remain stable across full dimension rebuilds or that continuous CDC synchronization is working.

Those capabilities require additional implementation and validation.
