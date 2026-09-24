WITH customers AS (

    SELECT *
    FROM {{ ref('stg_customers') }}

),

orders AS (

    SELECT *
    FROM {{ ref('stg_orders') }}

),

customer_orders_summary AS (

    SELECT
        customer_id,

        COUNT(DISTINCT order_id) AS lifetime_orders,

        MIN(created_at::date) AS first_order_date,

        MAX(created_at::date) AS last_order_date,

        SUM(total_amount) AS lifetime_spend

    FROM orders

    GROUP BY customer_id

),

joined AS (

    SELECT
        customers.*,

        COALESCE(customer_orders_summary.lifetime_orders, 0)
            AS lifetime_orders,

        customer_orders_summary.first_order_date,

        customer_orders_summary.last_order_date,

        COALESCE(customer_orders_summary.lifetime_spend, 0)
            AS lifetime_spend,

        CASE
            WHEN customer_orders_summary.lifetime_orders > 1
                THEN 'returning'
            WHEN customer_orders_summary.lifetime_orders = 1
                THEN 'new'
            ELSE 'no_orders'
        END AS customer_type

    FROM customers

    LEFT JOIN customer_orders_summary
        ON customers.customer_id = customer_orders_summary.customer_id

)

SELECT *
FROM joined