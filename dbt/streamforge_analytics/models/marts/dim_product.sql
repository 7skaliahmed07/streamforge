WITH products AS (

    SELECT *
    FROM {{ ref('stg_products') }}

)

SELECT
    ROW_NUMBER() OVER (ORDER BY product_id)::integer AS product_key,
    product_id,
    product_name,
    category,
    brand,
    product_price AS price,
    currency,
    vat_percentage,
    created_at,
    updated_at

FROM products
