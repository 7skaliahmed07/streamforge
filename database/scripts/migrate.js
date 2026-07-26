const path = require("path");

require("dotenv").config({
  path: path.resolve(__dirname, "../../backend/.env")
});


// console.log({
//   host: process.env.DATABASE_HOST,
//   database: process.env.DATABASE_NAME,
//   user: process.env.DATABASE_USER,
//   password: process.env.DATABASE_PASSWORD
// });

const fs = require("fs");
// const path = require("path");
const { Pool } = require("pg");


const pool = new Pool({
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  database: process.env.DATABASE_NAME,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD
});


const migrationPath = path.join(
  __dirname,
  "../migrations"
);


async function runMigrations() {

  const client = await pool.connect();

  try {

    console.log("Starting database migration");


    await client.query(`
      CREATE TABLE IF NOT EXISTS migrations (
        id SERIAL PRIMARY KEY,
        filename VARCHAR(255) UNIQUE NOT NULL,
        executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);


    const files = fs
      .readdirSync(migrationPath)
      .filter(file => file.endsWith(".sql"))
      .sort();


    for (const file of files) {

      const existing = await client.query(
        "SELECT * FROM migrations WHERE filename = $1",
        [file]
      );


      if (existing.rows.length > 0) {

        console.log(`Skipping ${file}`);

        continue;

      }


      const sql = fs.readFileSync(
        path.join(migrationPath, file),
        "utf8"
      );


      console.log(`Running ${file}`);


      await client.query(sql);


      await client.query(
        "INSERT INTO migrations(filename) VALUES($1)",
        [file]
      );


      console.log(`${file} completed`);

    }


    console.log("All migrations completed");


  } catch(error) {

    console.error(
      "Migration failed:---->",
      error.message
    );

    process.exit(1);


  } finally {

    client.release();

    await pool.end();

  }

}


runMigrations();