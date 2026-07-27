const db = require("../config/database");

async function getSummary() {

    const result = await db.query(`
        SELECT
            COUNT(*) AS total_orders,
            COUNT(DISTINCT customer_id) AS total_customers,
            SUM(total_amount) AS total_revenue,
            AVG(total_amount) AS average_order_value
        FROM orders
    `);

    const products = await db.query(`
        SELECT COUNT(*) AS total_products
        FROM products
    `);

    return {
        totalOrders: Number(result.rows[0].total_orders),
        totalCustomers: Number(result.rows[0].total_customers),
        totalRevenue: Number(result.rows[0].total_revenue),
        averageOrderValue: Number(result.rows[0].average_order_value),
        totalProducts: Number(products.rows[0].total_products)
    };
}

async function getTopProducts() {

    const result = await db.query(`
        SELECT
            p.name,
            p.category,
            SUM(oi.quantity) AS "unitsSold",
            ROUND(SUM(oi.quantity * oi.price), 2) AS revenue
        FROM order_items oi
        JOIN products p
            ON oi.product_id = p.id
        GROUP BY p.id, p.name, p.category
        ORDER BY revenue DESC
        LIMIT 10
    `);

    return result.rows.map(row => ({
    name: row.name,
    category: row.category,
    unitsSold: Number(row.unitsSold),
    revenue: Number(row.revenue)
    }
        ));
}


async function getCategorySales() {

    const result = await db.query(`
        SELECT
            p.category,
            SUM(oi.quantity) AS "unitsSold",
            ROUND(SUM(oi.quantity * oi.price), 2) AS revenue
        FROM order_items oi
        JOIN products p
            ON oi.product_id = p.id
        GROUP BY p.category
        ORDER BY revenue DESC
    `);

    return result.rows.map(row => ({
        category: row.category,
        unitsSold: Number(row.unitsSold),
        revenue: Number(row.revenue)
    }));
}


module.exports = {
    getSummary,
    getTopProducts,
    getCategorySales
};