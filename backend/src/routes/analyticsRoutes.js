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

module.exports = router;