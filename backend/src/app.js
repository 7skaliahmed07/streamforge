const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

// Import routes
const customerRoutes =
    require("./routes/customer.routes");
const app = express();

// Import Error Middleware
const errorHandler =
    require("./middleware/error.middleware");

// Import routes
const productRoutes =
    require("./routes/product.routes");

const orderRoutes =
    require("./routes/order.routes");

const inventoryRoutes =
    require("./routes/inventory.routes");


const analyticsRoutes =
    require("./routes/analyticsRoutes");

const salesRoutes = 
    require("./routes/salesAnalytics.routes");

const customerAnalyticsRoutes = 
    require("./routes/customerAnalytics.routes");

const productAnalyticsRoutes = 
    require("./routes/productAnalytics.routes");

const inventoryAnalyticsRoutes =
    require("./routes/inventoryAnalytics.routes");

const paymentAnalyticsRoutes =
    require("./routes/paymentAnalytics.routes");


const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./docs/swagger");

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

app.use(
    "/api/v1/orders",
    orderRoutes
);

app.use(
    "/api/v1/inventory",
    inventoryRoutes
);

app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
);


app.use(
    "/api/v1/analytics",
    analyticsRoutes
);

app.use("/api/v1/sales",
    salesRoutes
);

app.use(
    "/api/v1/customers/analytics",
    customerAnalyticsRoutes
);

app.use(
    "/api/v1/products/analytics",
    productAnalyticsRoutes
);


app.use(
    "/api/v1/inventory/analytics",
    inventoryAnalyticsRoutes
    );

app.use(
    "/api/v1/payments/analytics",
    paymentAnalyticsRoutes
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