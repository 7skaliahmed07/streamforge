# StreamForge Analytics

This project contains the dbt analytics layer for StreamForge.

StreamForge is a retail data platform built with PostgreSQL, dbt, and business intelligence tools.

## Purpose

The purpose of this project is to transform transactional data into clean and useful analytics models.

The analytics layer will support questions such as:

- How much revenue was generated each month?
- Which products generate the most revenue?
- Which customer segments purchase the most?
- Which cities generate the most sales?
- What is the payment success rate?

## Data source

The source data comes from the StreamForge PostgreSQL database.

The main source tables are:

- customers
- products
- orders
- order_items
- inventory
- payments

The users and migrations tables are not part of the analytics layer at this stage.

## Project layers

### Sources

Source definitions are stored in:

`models/staging/__sources.yml`

### Staging

Staging models read from the PostgreSQL source tables and apply basic cleaning and naming changes.

Current staging models:

- stg_customers
- stg_products
- stg_orders

Staging models are materialized as database views.

### Marts

Business-ready fact, dimension, and reporting models will be created after the staging layer is complete.

Marts will be materialized as tables.

## Useful commands

Parse the dbt project:

```bash
dbt/streamforge_analytics/.venv/bin/dbt parse \
  --project-dir dbt/streamforge_analytics