WITH payments AS (

    SELECT *
    FROM {{ ref('stg_payments') }}

),

orders AS (

    SELECT *
    FROM {{ ref('stg_orders') }}

),

payment_details AS (

    SELECT
        p.payment_id,
        p.order_id,
        o.customer_id,
        p.created_at::date AS payment_date,
        p.payment_status,
        p.payment_method,
        p.amount

    FROM payments p

    INNER JOIN orders o
        ON p.order_id = o.order_id

)

SELECT
    ROW_NUMBER() OVER (
        ORDER BY p.payment_id
    )::integer AS payment_fact_key,

    p.payment_id,
    p.order_id,
    dc.customer_key,
    dd.date_key,
    p.payment_status,
    p.payment_method,
    p.amount

FROM payment_details p

INNER JOIN {{ ref('dim_customer') }} dc
    ON p.customer_id = dc.customer_id

INNER JOIN {{ ref('dim_date') }} dd
    ON p.payment_date = dd.full_date
