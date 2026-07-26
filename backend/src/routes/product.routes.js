const express = require("express");

const router = express.Router();

const productController =
    require("../controllers/product.controller");

/**
 * @swagger
 * /api/v1/products:
 *   get:
 *     summary: Get all products
 *     description: Returns all products available in the retail system
 *     responses:
 *       200:
 *         description: Successful response
 */
router.get(
    "/",
    productController.getProducts
);


module.exports = router;