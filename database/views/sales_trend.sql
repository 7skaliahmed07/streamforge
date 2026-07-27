CREATE OR REPLACE VIEW sales_trend AS

SELECT

    DATE(created_at) AS sales_date,

    COUNT(*) AS orders,

    SUM(total_amount) AS revenue

FROM orders

GROUP BY DATE(created_at)

ORDER BY sales_date;