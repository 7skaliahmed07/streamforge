SELECT
    order_id,
    customer_id,
    order_number,
    order_status,
    total_amount,
    currency,
    shipping_city,
    created_at,
    updated_at
FROM {{ source('streamforge', 'orders') }}
