WITH source AS (

    SELECT *
    FROM {{ source('streamforge', 'orders') }}

),

renamed AS (

    SELECT
        id AS order_id,
        customer_id,
        order_number,
        order_status,
        total_amount,
        currency,
        shipping_city,
        created_at,
        updated_at
    FROM source

)

SELECT *
FROM renamed