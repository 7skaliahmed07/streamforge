CREATE OR REPLACE VIEW revenue_summary AS

SELECT

    COUNT(DISTINCT o.id) AS total_orders,

    COUNT(DISTINCT o.customer_id) AS total_customers,

    SUM(o.total_amount) AS total_revenue,

    AVG(o.total_amount) AS average_order_value,

    COUNT(DISTINCT oi.product_id) AS total_products

FROM orders o

JOIN order_items oi
ON o.id = oi.order_id;