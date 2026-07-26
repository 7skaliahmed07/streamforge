INSERT INTO payments
(order_id, payment_status, payment_method, amount)
VALUES

(1, 'completed', 'card', 1250.00),

(2, 'completed', 'paypal', 800.00),

(3, 'completed', 'card', 300.00)

ON CONFLICT DO NOTHING;