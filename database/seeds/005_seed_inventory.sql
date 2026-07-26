INSERT INTO inventory
(product_id, quantity)
VALUES

(1, 100),

(2, 150),

(3, 300),

(4, 75)

ON CONFLICT (product_id)
DO UPDATE SET
quantity = EXCLUDED.quantity;