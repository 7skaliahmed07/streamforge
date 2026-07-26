const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const app = express();

app.use(cors());
// app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());


app.get("/api/v1/health", (req, res) => {
  console.log("Health endpoint called");

  res.status(200).json({
    status: "healthy",
    service: "streamforge-api"
  });
});

module.exports = app;