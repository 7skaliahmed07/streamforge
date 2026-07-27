require("dotenv").config();

const { Pool } = require("pg");

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});

const warehouses = [
    "Amsterdam DC",
    "Rotterdam DC",
    "Utrecht DC",
    "Eindhoven DC",
    "Groningen DC"
];

function randomQuantity() {

    const r = Math.random();

    // 10% Low Stock
    if (r < 0.10)
        return Math.floor(Math.random() * 20);

    // 20% Medium Stock
    if (r < 0.30)
        return Math.floor(Math.random() * 60) + 20;

    // 70% Healthy Stock
    return Math.floor(Math.random() * 420) + 80;

}

async function main() {

    const client = await pool.connect();

    try {

        const products = await client.query(`
            SELECT id
            FROM products
            ORDER BY id
        `);

        console.log(`Generating inventory for ${products.rows.length} products...`);

        for (const product of products.rows) {

            const warehouse =
                warehouses[Math.floor(Math.random() * warehouses.length)];

            const quantity = randomQuantity();

            await client.query(`
                INSERT INTO inventory
                    (product_id, quantity, warehouse)
                VALUES ($1,$2,$3)
                ON CONFLICT (product_id)
                DO UPDATE
                SET
                    quantity = EXCLUDED.quantity,
                    warehouse = EXCLUDED.warehouse,
                    updated_at = CURRENT_TIMESTAMP
            `, [
                product.id,
                quantity,
                warehouse
            ]);

        }

        console.log("Inventory generated successfully.");

    } finally {

        client.release();

        await pool.end();

    }

}

main().catch(console.error);