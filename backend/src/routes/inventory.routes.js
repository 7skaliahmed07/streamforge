const express = require("express");

const router = express.Router();

const inventoryController =
    require("../controllers/inventory.controller");

/**
 * @swagger
 * /api/v1/inventory:
 *   get:
 *     summary: Get inventory information
 *     description: Returns product inventory levels
 *     responses:
 *       200:
 *         description: Successful response
 */
router.get(
    "/",
    inventoryController.getInventory
);


module.exports = router;