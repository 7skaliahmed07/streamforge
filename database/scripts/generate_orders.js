require("dotenv").config();

const { Pool } = require("pg");


const pool = new Pool({

    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD

});


const ORDER_COUNT = 100000;


const statuses = [
    "delivered",
    "delivered",
    "delivered",
    "delivered",
    "shipped",
    "processing",
    "cancelled"
];


const cities = [
    "Amsterdam",
    "Rotterdam",
    "Utrecht",
    "Eindhoven",
    "Groningen",
    "Almere",
    "Leiden",
    "Tilburg",
    "Breda",
    "Nijmegen"
];


function randomElement(array){

    return array[
        Math.floor(Math.random() * array.length)
    ];

}


function randomAmount(){

    return (
        Math.random() * (1500 - 20) + 20
    ).toFixed(2);

}


function randomDate(){

    const start = new Date("2025-01-01");

    const end = new Date("2026-07-31");


    const date = new Date(

        start.getTime() +

        Math.random() *
        (end.getTime() - start.getTime())

    );


    return date;

}



function generateOrderNumber(index, createdAt){

    const date =
        createdAt
        .toISOString()
        .slice(0,10)
        .replace(/-/g,"");


    return `SF-NL-${date}-${String(index).padStart(6,"0")}`;

}



async function generateOrders(){


    const client = await pool.connect();


    try {


        console.log("Fetching customers...");


        const result = await client.query(
            `
            SELECT id
            FROM customers
            `
        );


        const customers = result.rows;


        console.log(
            `${customers.length} customers available`
        );


        console.log("Generating orders...");



        const BATCH_SIZE = 1000;


        for(
            let batch = 0;
            batch < ORDER_COUNT / BATCH_SIZE;
            batch++
        ){


            let values = [];

            let placeholders = [];


            for(
                let i = 0;
                i < BATCH_SIZE;
                i++
            ){


                const orderIndex =
                    batch * BATCH_SIZE + i + 1;


                const customer =
                    randomElement(customers);



                const createdAt =
                    randomDate();


                const orderNumber =
                    generateOrderNumber(
                        orderIndex,
                        createdAt
                    );


                const status =
                    randomElement(statuses);


                const amount =
                    randomAmount();


                const city =
                    randomElement(cities);



                const offset =
                    i * 7;


                placeholders.push(
                `($${offset+1},
                    $${offset+2},
                    $${offset+3},
                    $${offset+4},
                    $${offset+5},
                    $${offset+6},
                    $${offset+7})`
                );


                values.push(
                customer.id,
                status,
                amount,
                orderNumber,
                "EUR",
                city,
                createdAt
            );


            }


            await client.query(

                `
                INSERT INTO orders
                (
                        customer_id,
                        order_status,
                        total_amount,
                        order_number,
                        currency,
                        shipping_city,
                        created_at
                )

                VALUES

                ${placeholders.join(",")}

                `,

                values

            );


            console.log(
                `Batch ${batch + 1}/100 completed`
            );


        }


        console.log(
            "100,000 orders created successfully"
        );



    }

    catch(error){

        console.error(
            "Order generation failed:",
            error
        );

        process.exit(1);

    }

    finally{

        client.release();

        await pool.end();

    }


}



generateOrders();