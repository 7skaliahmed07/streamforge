const express = require("express");

const router = express.Router();


const controller =
require("../controllers/paymentAnalytics.controller");



router.get(
    "/kpis",
    controller.getKPIs
);


router.get(
    "/methods",
    controller.getMethods
);


router.get(
    "/status",
    controller.getStatus
);


router.get(
    "/monthly-revenue",
    controller.getMonthlyRevenue
);



module.exports = router;