const db = require("../config/database");

const getSalesKPIs = async () => {

    const query = `

        SELECT

            COUNT(DISTINCT o.id) AS total_orders,

            SUM(o.total_amount) AS total_revenue,

            AVG(o.total_amount) AS average_order_value,

            COUNT(DISTINCT customer_id) AS unique_customers

        FROM orders o;

    `;

    const { rows } = await db.query(query);

    return rows[0];

};


const getMonthlySales = async () => {

    const query = `

        SELECT

            TO_CHAR(created_at,'Mon') AS month,

            DATE_PART('month',created_at) AS month_number,

            SUM(total_amount) AS revenue,

            COUNT(*) AS orders

        FROM orders

        GROUP BY month,month_number

        ORDER BY month_number;

    `;

    const { rows } = await db.query(query);

    return rows;

};


const getWeeklySales = async () => {

    const query = `

        SELECT

            EXTRACT(WEEK FROM created_at) AS week,

            SUM(total_amount) AS revenue,

            COUNT(*) AS orders

        FROM orders

        GROUP BY week

        ORDER BY week;

    `;

    const { rows } = await db.query(query);

    return rows;

};


const getTopRevenueDays = async () => {

    const query = `

        SELECT

            DATE(created_at) AS day,

            SUM(total_amount) AS revenue,

            COUNT(*) AS orders

        FROM orders

        GROUP BY day

        ORDER BY revenue DESC

        LIMIT 10;

    `;

    const { rows } = await db.query(query);

    return rows;

};


module.exports = {

    getSalesKPIs,

    getMonthlySales,

    getWeeklySales,

    getTopRevenueDays

};