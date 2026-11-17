BEGIN;

CREATE SCHEMA IF NOT EXISTS silver;

-- Current customer records from Spark Silver.
CREATE TABLE silver.customers (
    customer_id INTEGER PRIMARY KEY,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    email VARCHAR(255),
    phone VARCHAR(50),
    city VARCHAR(100),
    postal_code VARCHAR(30),
    country VARCHAR(100),
    customer_segment VARCHAR(50),
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    loaded_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Current product records from Spark Silver.
CREATE TABLE silver.products (
    product_id INTEGER PRIMARY KEY,
    product_name VARCHAR(255),
    category VARCHAR(100),
    brand VARCHAR(100),
    currency VARCHAR(10),
    price NUMERIC(10, 2),
    vat_percentage NUMERIC(5, 2),
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    loaded_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Current order records from Spark Silver.
CREATE TABLE silver.orders (
    order_id INTEGER PRIMARY KEY,
    customer_id INTEGER,
    order_status VARCHAR(50),
    total_amount NUMERIC(10, 2),
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    order_number VARCHAR(100),
    currency VARCHAR(10),
    shipping_city VARCHAR(100),
    loaded_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Current order item records from Spark Silver.
CREATE TABLE silver.order_items (
    order_item_id INTEGER PRIMARY KEY,
    order_id INTEGER,
    product_id INTEGER,
    quantity INTEGER,
    unit_price NUMERIC(10, 2),
    loaded_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Current payment records from Spark Silver.
CREATE TABLE silver.payments (
    payment_id INTEGER PRIMARY KEY,
    order_id INTEGER,
    payment_status VARCHAR(50),
    payment_method VARCHAR(50),
    amount NUMERIC(10, 2),
    created_at TIMESTAMP,
    loaded_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes for common relationship lookups.
CREATE INDEX idx_silver_orders_customer_id
    ON silver.orders(customer_id);

CREATE INDEX idx_silver_order_items_order_id
    ON silver.order_items(order_id);

CREATE INDEX idx_silver_order_items_product_id
    ON silver.order_items(product_id);

CREATE INDEX idx_silver_payments_order_id
    ON silver.payments(order_id);

COMMIT;
