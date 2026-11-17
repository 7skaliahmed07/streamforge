SELECT
    payment_id,
    order_id,
    payment_status,
    payment_method,
    amount,
    created_at
FROM {{ source('streamforge', 'payments') }}
