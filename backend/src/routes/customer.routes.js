const express = require("express");

const router = express.Router();

const customerController =
    require("../controllers/customer.controller");

/**
 * @swagger
 * /api/v1/customers:
 *   get:
 *     summary: Get all customers
 *     description: Returns all customers from the database
 *     responses:
 *       200:
 *         description: Successful response
 */
router.get(
    "/",
    customerController.getCustomers
);


module.exports = router;