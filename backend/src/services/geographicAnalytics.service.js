const pool = require("../config/database");


// =========================
// Geographic KPIs
// =========================

exports.getKPIs = async()=>{

    const query = `

        SELECT

            COUNT(DISTINCT country)
                AS total_countries,


            COUNT(DISTINCT city)
                AS total_cities,


            (
                SELECT country
                FROM customers
                GROUP BY country
                ORDER BY COUNT(*) DESC
                LIMIT 1
            )
                AS top_country,


            (
                SELECT city
                FROM customers
                GROUP BY city
                ORDER BY COUNT(*) DESC
                LIMIT 1
            )
                AS top_city


        FROM customers;


    `;


    const result =
        await pool.query(query);


    return result.rows[0];

};


// =========================
// Customers By Country
// =========================

exports.getCustomersByCountry = async()=>{

    const query = `

        SELECT

            country,

            COUNT(*) AS customers


        FROM customers


        GROUP BY country


        ORDER BY customers DESC;


    `;


    const result =
        await pool.query(query);


    return result.rows;

};



// =========================
// Customers By City
// =========================

exports.getCustomersByCity = async()=>{

    const query = `

        SELECT

            city,

            COUNT(*) AS customers


        FROM customers


        GROUP BY city


        ORDER BY customers DESC


        LIMIT 10;


    `;


    const result =
        await pool.query(query);


    return result.rows;

};



// =========================
// Revenue By City
// =========================

exports.getRevenueByCity = async()=>{


    const query = `


        SELECT


            c.city,


            COUNT(DISTINCT c.id)
                AS customers,


            SUM(o.total_amount)
                AS revenue



        FROM customers c


        JOIN orders o

        ON c.id=o.customer_id


        GROUP BY c.city


        ORDER BY revenue DESC


        LIMIT 10;



    `;


    const result =
        await pool.query(query);


    return result.rows;

};