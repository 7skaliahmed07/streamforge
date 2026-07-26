CREATE TABLE IF NOT EXISTS orders (

    id SERIAL PRIMARY KEY,

    customer_id INTEGER NOT NULL,

    order_status VARCHAR(50) DEFAULT 'created',

    total_amount DECIMAL(10,2),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,


    CONSTRAINT fk_customer

    FOREIGN KEY(customer_id)

    REFERENCES customers(id)

);