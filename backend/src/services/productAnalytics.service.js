const pool = require("../config/database");

exports.getKPIs = async () => {

    const query = `

        SELECT

            COUNT(*) AS total_products,

            COUNT(DISTINCT category) AS categories,

            ROUND(AVG(price),2) AS average_price,

            ROUND(
                COALESCE(
                    SUM(products.price * inventory.quantity),
                    0
                ),
                2
            ) AS inventory_value

        FROM products

        LEFT JOIN inventory
            ON inventory.product_id = products.id;

    `;

    const result = await pool.query(query);

    return result.rows[0];

};


exports.getMonthlyRevenue = async () => {

    const query = `

        SELECT

            TO_CHAR(o.created_at, 'Mon') AS month,

            EXTRACT(MONTH FROM o.created_at) AS month_number,

            ROUND(
                SUM(oi.quantity * oi.price),
                2
            ) AS revenue

        FROM orders o

        JOIN order_items oi
            ON oi.order_id = o.id

        GROUP BY
            TO_CHAR(o.created_at, 'Mon'),
            EXTRACT(MONTH FROM o.created_at)

        ORDER BY
            month_number;

    `;

    const result = await pool.query(query);

    return result.rows;

};

exports.getCategories = async () => {

    const query = `

        SELECT

            p.category,

            ROUND(
                SUM(
                    oi.price * oi.quantity
                ),
                2
            ) AS revenue,

            SUM(
                oi.quantity
            ) AS units_sold

        FROM order_items oi

        JOIN products p

            ON p.id=oi.product_id

        GROUP BY p.category

        ORDER BY revenue DESC;

    `;

    const result = await pool.query(query);

    return result.rows;

};



exports.getBrands = async () => {

    const query = `

        SELECT

            p.brand,

            ROUND(
                SUM(
                    oi.price * oi.quantity
                ),
                2
            ) AS revenue

        FROM order_items oi

        JOIN products p

            ON p.id=oi.product_id

        GROUP BY p.brand

        ORDER BY revenue DESC;

    `;

    const result = await pool.query(query);

    return result.rows;

};



exports.getTopProducts = async () => {

    const query = `

        SELECT

            p.name,

            p.brand,

            p.category,

            SUM(
                oi.quantity
            ) AS units_sold,

            COUNT(
                DISTINCT oi.order_id
            ) AS orders,

            ROUND(
                SUM(
                    oi.price * oi.quantity
                ),
                2
            ) AS revenue

        FROM order_items oi

        JOIN products p

            ON p.id=oi.product_id

        GROUP BY

            p.name,

            p.brand,

            p.category

        ORDER BY revenue DESC

        LIMIT 10;

    `;

    const result = await pool.query(query);

    return result.rows;

};



exports.getInventoryValue = async () => {

    const query = `

        SELECT

            p.category,

            ROUND(

                SUM(

                    inventory.quantity * p.price

                ),

                2

            ) AS inventory_value

        FROM inventory

        JOIN products p

            ON inventory.product_id=p.id

        GROUP BY p.category

        ORDER BY inventory_value DESC;

    `;

    const result = await pool.query(query);

    return result.rows;

};



exports.getLowStock = async () => {

    const query = `

        SELECT

            p.name,

            p.brand,

            inventory.quantity

        FROM inventory

        JOIN products p

            ON inventory.product_id=p.id

        ORDER BY inventory.quantity

        LIMIT 10;

    `;

    const result = await pool.query(query);

    return result.rows;

};



exports.getPricing = async () => {

    const query = `

        SELECT

            CASE

                WHEN price < 100 THEN '€0-100'

                WHEN price < 300 THEN '€100-300'

                WHEN price < 600 THEN '€300-600'

                WHEN price < 1000 THEN '€600-1000'

                ELSE '€1000+'

            END AS range,

            COUNT(*) AS products

        FROM products

        GROUP BY range

        ORDER BY range;

    `;

    const result = await pool.query(query);

    return result.rows;

};