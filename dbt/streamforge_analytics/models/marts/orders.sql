WITH orders AS (

    SELECT *
    FROM {{ ref('stg_orders') }}

),

order_items AS (

    SELECT *
    FROM {{ ref('stg_order_items') }}

),

order_items_summary AS (

    SELECT
        order_id,

        COUNT(DISTINCT order_item_id) AS item_count,

        SUM(quantity) AS total_units,

        SUM(quantity * item_price) AS items_revenue

    FROM order_items

    GROUP BY order_id

),

compute_metrics AS (

    SELECT
        orders.*,

        orders.created_at::date AS order_date,

        COALESCE(order_items_summary.item_count, 0)
            AS item_count,

        COALESCE(order_items_summary.total_units, 0)
            AS total_units,

        COALESCE(order_items_summary.items_revenue, 0)
            AS items_revenue

    FROM orders

    LEFT JOIN order_items_summary
        ON orders.order_id = order_items_summary.order_id

),

customer_order_count AS (

    SELECT
        *,

        ROW_NUMBER() OVER (
            PARTITION BY customer_id
            ORDER BY order_date, order_id
        ) AS customer_order_number

    FROM compute_metrics

)

SELECT *
FROM customer_order_count