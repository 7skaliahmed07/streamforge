require("dotenv").config();

const { Pool } = require("pg");


const pool = new Pool({

    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD

});


const BATCH_SIZE = 1000;


function randomInt(min, max){

    return Math.floor(
        Math.random() * (max - min + 1)
    ) + min;

}



async function generateOrderItems(){


    const client = await pool.connect();


    try {


        console.log("Fetching orders...");


        const ordersResult = await client.query(
            `
            SELECT id
            FROM orders
            `
        );


        const orders = ordersResult.rows;


        console.log(
            `${orders.length} orders found`
        );



        console.log("Fetching products...");


        const productsResult = await client.query(
            `
            SELECT id, price
            FROM products
            `
        );


        const products = productsResult.rows;


        console.log(
            `${products.length} products found`
        );



        console.log("Generating order items...");



        let values = [];
        let placeholders = [];

        let itemCount = 0;



        for(const order of orders){


            // Each order gets 1-5 products

            const itemNumber =
                randomInt(1,5);



            const selectedProducts = new Set();



            for(
                let i = 0;
                i < itemNumber;
                i++
            ){


                const product =
                    products[
                        randomInt(
                            0,
                            products.length - 1
                        )
                    ];



                // avoid duplicate product in same order

                if(selectedProducts.has(product.id)){
                    continue;
                }


                selectedProducts.add(product.id);



                const quantity =
                    randomInt(1,3);



                const price =
                    product.price;



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
                    product.id,
                    quantity,
                    price
                );


                itemCount++;



                if(values.length >= BATCH_SIZE * 4){


                    await client.query(
                        `
                        INSERT INTO order_items
                        (
                            order_id,
                            product_id,
                            quantity,
                            price
                        )

                        VALUES

                        ${placeholders.join(",")}

                        `,
                        values
                    );


                    console.log(
                        `${itemCount} items inserted`
                    );


                    values=[];
                    placeholders=[];

                }


            }


        }



        // insert remaining items

        if(values.length > 0){


            await client.query(
                `
                INSERT INTO order_items
                (
                    order_id,
                    product_id,
                    quantity,
                    price
                )

                VALUES

                ${placeholders.join(",")}

                `,
                values
            );

        }



        console.log(
            `Completed. ${itemCount} order items created`
        );


    }


    catch(error){

        console.error(
            "Order item generation failed:",
            error
        );

    }


    finally{

        client.release();

        await pool.end();

    }


}



generateOrderItems();