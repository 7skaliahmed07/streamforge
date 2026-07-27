CREATE OR REPLACE VIEW top_products AS

SELECT

    p.name,

    p.category,

    SUM(oi.quantity) AS units_sold,

    SUM(oi.quantity * oi.price) AS revenue

FROM order_items oi

JOIN products p
ON oi.product_id = p.id

GROUP BY p.name, p.category

ORDER BY revenue DESC

LIMIT 10;