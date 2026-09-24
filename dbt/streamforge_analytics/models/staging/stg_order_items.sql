WITH source AS (

    SELECT *
    FROM {{ source('streamforge', 'order_items') }}

),

renamed AS (

    SELECT
        id AS order_item_id,
        order_id,
        product_id,
        quantity,
        price AS item_price
    FROM source

)

SELECT *
FROM renamed