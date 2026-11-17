WITH customers AS (

    SELECT *
    FROM {{ ref('stg_customers') }}

)

SELECT
    ROW_NUMBER() OVER (ORDER BY customer_id)::integer AS customer_key,
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

FROM customers
