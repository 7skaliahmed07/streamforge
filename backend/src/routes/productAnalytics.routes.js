const express = require("express");

const router = express.Router();

const controller = require("../controllers/productAnalytics.controller");


router.get("/kpis", controller.getKPIs);

router.get("/monthly-revenue", controller.getMonthlyRevenue);

router.get("/categories", controller.getCategories);

router.get("/brands", controller.getBrands);

router.get("/top-products", controller.getTopProducts);

router.get("/inventory-value", controller.getInventoryValue);

router.get("/low-stock", controller.getLowStock);

router.get("/pricing", controller.getPricing);


module.exports = router;