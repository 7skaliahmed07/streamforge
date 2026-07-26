CREATE TABLE IF NOT EXISTS payments (

    id SERIAL PRIMARY KEY,

    order_id INTEGER NOT NULL,

    payment_status VARCHAR(50),

    payment_method VARCHAR(50),

    amount DECIMAL(10,2),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,


    CONSTRAINT fk_payment_order

    FOREIGN KEY(order_id)

    REFERENCES orders(id)

);