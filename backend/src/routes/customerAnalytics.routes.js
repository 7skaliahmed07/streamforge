const express = require("express");

const router = express.Router();

const controller = require("../controllers/customerAnalytics.controller");



router.get("/kpis", controller.getKPIs);

router.get("/growth", controller.getGrowth);

router.get("/segments", controller.getSegments);

router.get("/top-customers", controller.getTopCustomers);

router.get("/cities", controller.getCities);



module.exports = router;