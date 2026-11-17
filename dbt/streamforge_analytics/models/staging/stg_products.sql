SELECT
    product_id,
    product_name,
    category,
    brand,
    price AS product_price,
    currency,
    vat_percentage,
    created_at,
    updated_at
FROM {{ source('streamforge', 'products') }}
