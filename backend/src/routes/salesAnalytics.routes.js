const express = require("express");

const router = express.Router();

const controller = require("../controllers/salesAnalytics.controller");

router.get("/kpis",controller.getSalesKPIs);

router.get("/monthly",controller.getMonthlySales);

router.get("/weekly",controller.getWeeklySales);

router.get("/top-days",controller.getTopRevenueDays);

module.exports = router;