const express = require("express");

const router = express.Router();

const orderController =
    require("../controllers/order.controller");

/**
 * @swagger
 * /api/v1/orders:
 *   get:
 *     summary: Get all orders
 *     description: Returns orders with customer and payment information
 *     responses:
 *       200:
 *         description: Successful response
 */
router.get(
    "/",
    orderController.getOrders
);


module.exports = router;
