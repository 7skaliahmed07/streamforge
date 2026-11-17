WITH order_items AS (

    SELECT *
    FROM {{ ref('stg_order_items') }}

),

orders AS (

    SELECT *
    FROM {{ ref('stg_orders') }}

),

sales AS (

    SELECT
        oi.order_item_id,
        oi.order_id,
        oi.product_id,
        o.customer_id,
        o.created_at::date AS sales_date,
        oi.quantity,
        oi.item_price,
        o.order_status

    FROM order_items oi

    INNER JOIN orders o
        ON oi.order_id = o.order_id

)

SELECT
    ROW_NUMBER() OVER (
        ORDER BY s.order_item_id
    )::integer AS sales_fact_key,

    s.order_item_id,
    s.order_id,
    dp.product_key,
    dc.customer_key,
    dd.date_key,
    s.quantity,
    s.item_price AS unit_price,
    (s.quantity * s.item_price)::numeric(18, 2) AS sales_amount,
    s.order_status

FROM sales s

INNER JOIN {{ ref('dim_product') }} dp
    ON s.product_id = dp.product_id

INNER JOIN {{ ref('dim_customer') }} dc
    ON s.customer_id = dc.customer_id

INNER JOIN {{ ref('dim_date') }} dd
    ON s.sales_date = dd.full_date
