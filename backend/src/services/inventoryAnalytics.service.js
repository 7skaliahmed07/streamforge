const pool = require("../config/database");


exports.getKPIs = async()=>{

    const query = `

        SELECT

        COUNT(*) AS total_products,

        SUM(quantity) AS total_stock,

        SUM(quantity * p.price) AS inventory_value,

        AVG(quantity) AS average_stock

        FROM inventory i

        JOIN products p

        ON i.product_id=p.id;

    `;


    const result =
        await pool.query(query);


    return result.rows[0];

};



exports.getStockStatus = async()=>{

    const query = `

        SELECT

        CASE

            WHEN quantity <= 5 THEN 'Critical'

            WHEN quantity <= 50 THEN 'Low'

            ELSE 'Healthy'

        END AS status,

        COUNT(*) AS products


        FROM inventory


        GROUP BY status;

    `;


    const result =
        await pool.query(query);


    return result.rows;

};



exports.getCategoryStock = async()=>{

    const query=`

        SELECT

        p.category,

        SUM(i.quantity) AS quantity


        FROM inventory i


        JOIN products p

        ON i.product_id=p.id


        GROUP BY p.category;


    `;


    const result =
        await pool.query(query);


    return result.rows;

};



exports.getLowStock = async()=>{


    const query=`

        SELECT

        p.name,

        p.brand,

        i.quantity


        FROM inventory i


        JOIN products p

        ON i.product_id=p.id


        WHERE quantity <= 5


        ORDER BY quantity ASC

        LIMIT 20;


    `;


    const result =
        await pool.query(query);


    return result.rows;

};



exports.getInventoryTable = async()=>{


    const query=`

        SELECT

        p.name,

        p.category,

        p.brand,

        i.quantity


        FROM inventory i


        JOIN products p

        ON i.product_id=p.id


        ORDER BY quantity ASC;


    `;


    const result =
        await pool.query(query);


    return result.rows;

};