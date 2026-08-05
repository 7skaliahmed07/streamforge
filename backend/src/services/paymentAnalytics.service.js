const pool = require("../config/database");



exports.getKPIs = async()=>{

    const query = `

        SELECT

            COUNT(*) AS total_payments,

            COUNT(
                CASE 
                    WHEN LOWER(payment_status)='completed'
                    THEN 1
                END
            ) AS successful_payments,


            COUNT(
                CASE 
                    WHEN LOWER(payment_status)!='completed'
                    THEN 1
                END
            ) AS failed_payments,


            COALESCE(
                SUM(amount),
                0
            ) AS total_revenue


        FROM payments;

    `;


    const result = await pool.query(query);

    return result.rows[0];

};





exports.getMethods = async()=>{


    const query = `

        SELECT

            payment_method,

            COUNT(*) AS payments,

            SUM(amount) AS revenue


        FROM payments


        GROUP BY payment_method


        ORDER BY payments DESC;


    `;


    const result =
        await pool.query(query);


    return result.rows;


};






exports.getStatus = async()=>{


    const query = `

        SELECT

            payment_status,

            COUNT(*) AS payments


        FROM payments


        GROUP BY payment_status;


    `;


    const result =
        await pool.query(query);


    return result.rows;


};







exports.getMonthlyRevenue = async()=>{


    const query = `

    SELECT

        TO_CHAR(
            DATE_TRUNC('month', created_at),
            'Mon YYYY'
        ) AS month,


        SUM(amount) AS revenue,


        DATE_TRUNC(
            'month',
            created_at
        ) AS month_date


    FROM payments


    GROUP BY
        DATE_TRUNC(
            'month',
            created_at
        )


    ORDER BY month_date;


    `;


    const result =
        await pool.query(query);


    return result.rows;


};