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


async function getPaymentMethods() {

    const result = await db.query(`
        SELECT
            payment_method,
            COUNT(*) AS transactions,
            ROUND(SUM(amount), 2) AS revenue
        FROM payments
        GROUP BY payment_method
        ORDER BY revenue DESC;
    `);

    return result.rows.map(row => ({
        paymentMethod: row.payment_method,
        transactions: Number(row.transactions),
        revenue: Number(row.revenue)
    }));

}

async function getRevenueTrend() {

    const result = await db.query(`
        SELECT
            DATE(created_at) AS date,
            ROUND(SUM(total_amount),2) AS revenue,
            COUNT(*) AS orders
        FROM orders
        GROUP BY DATE(created_at)
        ORDER BY DATE(created_at);
    `);

    return result.rows.map(row => ({
        date: row.date,
        revenue: Number(row.revenue),
        orders: Number(row.orders)
    }));

}


async function getInventoryStatus() {

    const result = await db.query(`
        SELECT
            p.name,
            p.category,
            i.quantity
        FROM inventory i
        JOIN products p
            ON p.id=i.product_id
        ORDER BY i.quantity ASC
        LIMIT 20;
    `);

    return result.rows.map(row => ({
        name: row.name,
        category: row.category,
        quantity: Number(row.quantity)
    }));

}


async function getCustomerSegments(){

    const result = await db.query(`

        SELECT

            customer_segment,

            COUNT(*) AS customers

        FROM customers

        GROUP BY customer_segment

        ORDER BY customers DESC;

    `);

    return result.rows.map(row=>({

        segment:row.customer_segment,
        customers:Number(row.customers)

    }));

}


async function getCitySales() {

    const result = await db.query(`
        SELECT
            shipping_city,
            COUNT(*) AS orders,
            ROUND(SUM(total_amount),2) AS revenue
        FROM orders
        GROUP BY shipping_city
        ORDER BY revenue DESC
    `);

    return result.rows.map(row => ({
        city: row.shipping_city,
        orders: Number(row.orders),
        revenue: Number(row.revenue)
    }));

}
module.exports = {
    getSummary,
    getTopProducts,
    getCategorySales,
    getPaymentMethods,
    getRevenueTrend,
    getInventoryStatus,
    getCustomerSegments,
    getCitySales
};