const pool = require("../config/database");



// =========================
// KPI
// =========================

exports.getKPIs = async () => {

    const query = `

        SELECT

            COUNT(*) AS total_customers,


            COUNT(*) FILTER (

                WHERE customer_segment='Premium'

            ) AS premium_customers,


            COUNT(*) FILTER (

                WHERE created_at >= DATE_TRUNC('year', NOW())

            ) AS new_customers,


            COALESCE(

                (
                    SELECT
                        SUM(total_amount)
                        /
                        COUNT(DISTINCT customer_id)

                    FROM orders
                ),

                0

            ) AS average_customer_value


        FROM customers;

    `;


    const result = await pool.query(query);

    return result.rows[0];

};



// =========================
// Growth
// =========================

exports.getGrowth = async () => {

    const query = `

        WITH monthly AS (

            SELECT

                DATE_TRUNC(
                    'month',
                    created_at
                ) AS month,

                COUNT(*) AS new_customers


            FROM customers


            GROUP BY month

        )


        SELECT

            TO_CHAR(
                month,
                'Mon YYYY'
            ) AS month,


            SUM(new_customers)
            OVER(
                ORDER BY month
            ) AS customers


        FROM monthly


        ORDER BY month;

    `;


    const result = await pool.query(query);

    return result.rows;

};

// =========================
// Segments
// =========================

exports.getSegments = async () => {

    const query = `

        SELECT

            customer_segment,

            COUNT(*) AS customers

        FROM customers

        GROUP BY customer_segment

        ORDER BY customers DESC;

    `;

    const result = await pool.query(query);

    return result.rows;

};



// =========================
// Top Customers
// =========================

exports.getTopCustomers = async () => {

    const query = `

        SELECT

            c.first_name,

            c.last_name,

            c.city,

            c.customer_segment,

            COUNT(o.id) AS orders,

            SUM(o.total_amount) AS revenue

        FROM customers c

        JOIN orders o

        ON c.id=o.customer_id

        GROUP BY

            c.id,

            c.first_name,

            c.last_name,

            c.city,

            c.customer_segment

        ORDER BY revenue DESC

        LIMIT 10;

    `;

    const result = await pool.query(query);

    return result.rows;

};



// =========================
// Cities
// =========================

exports.getCities = async () => {

    const query = `

        SELECT

            city,

            COUNT(*) AS customers

        FROM customers

        GROUP BY city

        ORDER BY customers DESC;

    `;

    const result = await pool.query(query);

    return result.rows;

};