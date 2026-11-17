WITH date_bounds AS (

    SELECT
        LEAST(
            MIN(created_at::date),
            (SELECT MIN(created_at::date) FROM {{ ref('stg_payments') }})
        ) AS min_date,

        GREATEST(
            MAX(created_at::date),
            (SELECT MAX(created_at::date) FROM {{ ref('stg_payments') }})
        ) AS max_date

    FROM {{ ref('stg_orders') }}

),

calendar AS (

    SELECT
        generated_date::date AS full_date

    FROM date_bounds,

    LATERAL generate_series(
        min_date,
        max_date,
        INTERVAL '1 day'
    ) AS generated_date

)

SELECT
    CAST(TO_CHAR(full_date, 'YYYYMMDD') AS INTEGER) AS date_key,
    full_date,
    EXTRACT(DAY FROM full_date)::integer AS day,
    EXTRACT(MONTH FROM full_date)::integer AS month,
    TRIM(TO_CHAR(full_date, 'Month')) AS month_name,
    EXTRACT(QUARTER FROM full_date)::integer AS quarter,
    EXTRACT(YEAR FROM full_date)::integer AS year,
    EXTRACT(WEEK FROM full_date)::integer AS week,
    EXTRACT(DOW FROM full_date)::integer AS day_of_week,
    TRIM(TO_CHAR(full_date, 'Day')) AS day_name

FROM calendar
