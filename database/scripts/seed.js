const path = require("path");

require("dotenv").config({
  path: path.resolve(__dirname, "../../backend/.env")
});

const fs = require("fs");
const { Pool } = require("pg");


const pool = new Pool({
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  database: process.env.DATABASE_NAME,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD
});


const seedPath = path.join(
  __dirname,
  "../seeds"
);


async function runSeeds() {

  const client = await pool.connect();

  try {

    console.log("Starting database seed");


    const files = fs
      .readdirSync(seedPath)
      .filter(file => file.endsWith(".sql"))
      .sort();


    for (const file of files) {

      const sql = fs.readFileSync(
        path.join(seedPath, file),
        "utf8"
      );


      console.log(`Running ${file}`);


      await client.query(sql);


      console.log(`${file} completed`);

    }


    console.log("All seeds completed");


  } catch(error) {

    console.error(
      "Seed failed:",
      error.message
    );

    process.exit(1);


  } finally {

    client.release();

    await pool.end();

  }

}


runSeeds();