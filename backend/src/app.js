const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const customerRoutes =
    require("./routes/customer.routes");
const app = express();

const errorHandler =
    require("./middleware/error.middleware");

const productRoutes =
    require("./routes/product.routes");

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());


app.use(
    "/api/v1/customers",
    customerRoutes
);

app.use(
    "/api/v1/products",
    productRoutes
);



app.get("/api/v1/health", (req, res) => {
  console.log("Health endpoint called");

  res.status(200).json({
    status: "healthy",
    service: "streamforge-api"
  });
});


app.use(errorHandler);
module.exports = app;