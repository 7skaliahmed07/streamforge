SELECT
    order_item_id,
    order_id,
    product_id,
    quantity,
    unit_price AS item_price
FROM {{ source('streamforge', 'order_items') }}
