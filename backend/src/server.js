require("dotenv").config();

const app = require("./app");
const pool = require("./config/database");

const PORT = process.env.PORT || 5001;


pool.query("SELECT NOW()")
  .then(() => {
    console.log("Database connection successful");

    app.listen(PORT, () => {
      console.log(`StreamForge API running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error.message);
  });