WITH order_items AS (

    SELECT *
    FROM {{ ref('stg_order_items') }}

),

orders AS (

    SELECT *
    FROM {{ ref('stg_orders') }}

),

products AS (

    SELECT *
    FROM {{ ref('stg_products') }}

),

joined AS (

    SELECT
        order_items.order_item_id,
        order_items.order_id,
        order_items.product_id,
        order_items.quantity,
        order_items.item_price,

        orders.order_number,
        orders.customer_id,
        orders.order_status,
        orders.total_amount,
        orders.currency AS order_currency,
        orders.shipping_city,
        orders.created_at AS order_created_at,

        products.product_name,
        products.category,
        products.brand,
        products.product_price,
        products.currency AS product_currency,
        products.vat_percentage

    FROM order_items

    LEFT JOIN orders
        ON order_items.order_id = orders.order_id

    LEFT JOIN products
        ON order_items.product_id = products.product_id

)

SELECT *
FROM joined