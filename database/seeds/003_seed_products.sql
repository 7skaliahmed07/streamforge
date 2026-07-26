INSERT INTO products
(name, category, price)
VALUES

('Laptop', 'Electronics', 1200.00),

('Smart Phone', 'Electronics', 800.00),

('Keyboard', 'Accessories', 50.00),

('Monitor', 'Electronics', 300.00)

ON CONFLICT DO NOTHING;