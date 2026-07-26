CREATE TABLE IF NOT EXISTS inventory (

    id SERIAL PRIMARY KEY,

    product_id INTEGER UNIQUE NOT NULL,

    quantity INTEGER DEFAULT 0,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,


    CONSTRAINT fk_inventory_product

    FOREIGN KEY(product_id)

    REFERENCES products(id)

);