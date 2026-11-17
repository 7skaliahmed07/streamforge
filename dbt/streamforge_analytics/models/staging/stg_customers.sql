SELECT
    customer_id,
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
FROM {{ source('streamforge', 'customers') }}
