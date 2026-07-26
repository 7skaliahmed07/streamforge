const db = require("../config/database");


async function getAllOrders() {

    const result = await db.query(
        `
        SELECT
            orders.id AS order_id,

            CONCAT(
                customers.first_name,
                ' ',
                customers.last_name
            ) AS customer_name,

            orders.order_status AS status,

            orders.total_amount,

            payments.payment_status,

            payments.payment_method

        FROM orders

        JOIN customers
            ON orders.customer_id = customers.id

        LEFT JOIN payments
            ON orders.id = payments.order_id

        ORDER BY orders.id;
        `
    );


    return result.rows;

}


module.exports = {
    getAllOrders
};