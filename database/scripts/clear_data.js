require("dotenv").config();

const { Pool } = require("pg");


const pool = new Pool({

    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD

});


async function clearDatabase(){

    const client = await pool.connect();


    try {

        console.log("Clearing database data...");


        await client.query(`

            TRUNCATE TABLE

            payments,
            inventory,
            order_items,
            orders,
            products,
            customers,
            users

            RESTART IDENTITY

            CASCADE;

        `);


        console.log("Database cleared successfully");


    } catch(error){

        console.error(
            "Failed to clear database:",
            error
        );


    } finally {

        client.release();

        await pool.end();

    }

}


clearDatabase();