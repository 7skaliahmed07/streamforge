WITH source AS (

    SELECT *
    FROM {{ source('streamforge', 'customers') }}

),

renamed AS (

    SELECT
        id AS customer_id,
        first_name,
        last_name,
        email,
        phone,
        city,
        postal_code,
        country,
        customer_segment,
        created_at,
        updated_at

    FROM source

)

SELECT *
FROM renamed
