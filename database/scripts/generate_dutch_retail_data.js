require("dotenv").config();

const { Pool } = require("pg");

const { faker } = require("@faker-js/faker");


const pool = new Pool({

    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD

});

const dutchCities = [
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

const customerSegments = [
    "Premium",
    "Regular",
    "New Customer"
];

async function generateCustomers(){


    const client = await pool.connect();


    try {


        console.log("Generating Dutch customers...");


        for(let i = 0; i < 10000; i++){


            const firstName =
                faker.person.firstName();


            const lastName =
                faker.person.lastName();


            const email =
                `${firstName}.${lastName}.${i}@example.nl`
                    .toLowerCase()
                    .replace(/\s/g, "");


            const city =
                faker.helpers.arrayElement(
                    dutchCities
                );


            const postalCode =
                faker.location.zipCode();


            const segment =
                faker.helpers.arrayElement(
                    customerSegments
                );



            await client.query(

                `
                INSERT INTO customers
                (
                    first_name,
                    last_name,
                    email,
                    phone,
                    city,
                    postal_code,
                    country,
                    customer_segment
                )

                VALUES
                (
                    $1,$2,$3,$4,$5,$6,$7,$8
                )
                `,


                [
                    firstName,
                    lastName,
                    email,
                    faker.phone.number(),
                    city,
                    postalCode,
                    "Netherlands",
                    segment
                ]

            );


        }


        console.log(
            "10,000 Dutch customers created"
        );


    }

    catch(error){

        console.error(error);

    }

    finally{

        client.release();


    }


}

async function generateProducts() {

    const client = await pool.connect();

    try {

        console.log("Generating Dutch products...");
            const brands = [
                "Samsung",
                "Philips",
                "Apple",
                "Miele",
                "Bosch",
                "Nike",
                "Adidas",
                "Sony",
                "JBL",
                "IKEA"
            ];


            const categories = [
                "Electronics",
                "Home & Living",
                "Fashion",
                "Sports",
                "Grocery"
            ];


            const productNames = [
                "Laptop",
                "Smartphone",
                "Headphones",
                "Coffee Machine",
                "Airfryer",
                "Running Shoes",
                "Monitor",
                "Vacuum Cleaner",
                "Backpack",
                "Office Chair"
            ];
       

        for(let i = 1; i <= 500; i++) {


            const brand =
                faker.helpers.arrayElement(brands);


            const productType =
                faker.helpers.arrayElement(productNames);


            const category =
                faker.helpers.arrayElement(categories);


            const name =
                `${brand} ${productType} ${i}`;


            const price =
                faker.number.float({
                    min: 5,
                    max: 1500,
                    fractionDigits: 2
                });



            await client.query(
                `
                INSERT INTO products
                (
                    name,
                    category,
                    brand,
                    price,
                    currency,
                    vat_percentage
                )

                VALUES
                (
                    $1,$2,$3,$4,$5,$6
                )
                `,
                [
                    name,
                    category,
                    brand,
                    price,
                    "EUR",
                    21.00
                ]
            );

        }

        console.log("500 Dutch products created");


    } catch(error) {

        console.error(error);

    } finally {

        client.release();

    }

}

async function main(){

    try {

        await generateCustomers();

        await generateProducts();


        console.log("Dutch retail data generation completed");


    } catch(error){

        console.error(error);

        process.exit(1);


    } finally {

        await pool.end();

    }

}


main();