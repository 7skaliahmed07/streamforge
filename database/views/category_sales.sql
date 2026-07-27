CREATE OR REPLACE VIEW category_sales AS

SELECT

    p.category,

    SUM(oi.quantity) AS units_sold,

    SUM(oi.quantity * oi.price) AS revenue

FROM order_items oi

JOIN products p
ON oi.product_id = p.id

GROUP BY p.category

ORDER BY revenue DESC;