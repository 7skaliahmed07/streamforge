-- with

-- source as (

--     -- {# This references seed (CSV) data - try switching to {{ source('ecom', 'raw_customers') }} #}
--     select * from {{ ref('raw_customers') }}

-- ),

-- renamed as (

--     select

--         ----------  ids
--         id as customer_id,

--         ---------- text
--         name as customer_name

--     from source

-- )

-- select * from renamed


WITH source AS (

    SELECT *
    FROM public.customers

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
