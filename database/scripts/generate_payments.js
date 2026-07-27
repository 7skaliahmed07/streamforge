require("dotenv").config();

const { Pool } = require("pg");


const pool = new Pool({

    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD

});


function randomPaymentMethod(){

    const random = Math.random();

    if(random < 0.60)
        return "iDEAL";

    if(random < 0.80)
        return "Credit Card";

    if(random < 0.90)
        return "PayPal";

    return "Klarna";
}


const paymentStatuses = [
    "completed",
    "completed",
    "completed",
    "completed",
    "completed",
    "completed",
    "completed",
    "pending",
    "failed"
];


function randomElement(array){

    return array[
        Math.floor(Math.random() * array.length)
    ];

}



async function generatePayments(){


    const client = await pool.connect();


    try {


        console.log("Fetching orders...");


        const ordersResult = await client.query(
            `
            SELECT 
                id,
                total_amount
            FROM orders
            `
        );


        const orders = ordersResult.rows;


        console.log(
            `${orders.length} orders found`
        );


        console.log("Generating payments...");


        const BATCH_SIZE = 1000;


        let values = [];
        let placeholders = [];

        let count = 0;



        for(const order of orders){


            const paymentMethod =
                randomPaymentMethod();


            const status =
                randomElement(paymentStatuses);



            const offset =
                values.length;



            placeholders.push(
                `($${offset+1},
                  $${offset+2},
                  $${offset+3},
                  $${offset+4})`
            );


            values.push(

                order.id,

                status,

                paymentMethod,

                order.total_amount

            );


            count++;



            if(values.length >= BATCH_SIZE * 4){


                await client.query(

                    `
                    INSERT INTO payments
                    (
                        order_id,
                        payment_status,
                        payment_method,
                        amount
                    )

                    VALUES

                    ${placeholders.join(",")}

                    `,

                    values

                );


                console.log(
                    `${count} payments inserted`
                );


                values=[];
                placeholders=[];


            }


        }



        if(values.length > 0){


            await client.query(

                `
                INSERT INTO payments
                (
                    order_id,
                    payment_status,
                    payment_method,
                    amount
                )

                VALUES

                ${placeholders.join(",")}

                `,

                values

            );


        }



        console.log(
            `${count} payments created successfully`
        );


    }


    catch(error){

        console.error(
            "Payment generation failed:",
            error
        );

    }


    finally{

        client.release();

        await pool.end();

    }


}

generatePayments();