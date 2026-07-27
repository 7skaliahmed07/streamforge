CREATE OR REPLACE VIEW customer_growth AS

SELECT

    DATE(created_at) AS signup_date,

    COUNT(*) AS new_customers

FROM customers

GROUP BY DATE(created_at)

ORDER BY signup_date;