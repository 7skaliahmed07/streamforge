WITH source AS (

    SELECT *
    FROM {{ source('streamforge', 'products') }}

),

renamed AS (

    SELECT
        id AS product_id,
        name AS product_name,
        category,
        brand,
        price AS product_price,
        currency,
        vat_percentage,
        created_at,
        updated_at
    FROM source

)

SELECT *
FROM renamed