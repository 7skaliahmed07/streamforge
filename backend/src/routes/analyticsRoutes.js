const express = require("express");

const router = express.Router();

const analyticsController =
    require("../controllers/analyticsController");

router.get(
    "/summary",
    analyticsController.getSummary
);

router.get(
    "/top-products",
    analyticsController.getTopProducts
);


router.get(
    "/category-sales",
    analyticsController.getCategorySales
);

router.get(
    "/payment-methods",
    analyticsController.getPaymentMethods
);

router.get(
    "/revenue-trend",
    analyticsController.getRevenueTrend
);

router.get(
    "/inventory-status",
    analyticsController.getInventoryStatus
);

router.get(
    "/city-sales",
    analyticsController.getCitySales
);

router.get(
    "/customer-segments",
    analyticsController.getCustomerSegments
);


module.exports = router;