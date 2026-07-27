const analyticsService = require("../services/analyticsService");

async function getSummary(req, res) {

    try {

        const summary = await analyticsService.getSummary();

        res.json({
            success: true,
            data: summary
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch analytics summary"
        });

    }

}

async function getTopProducts(req, res) {

    try {

        const products =
            await analyticsService.getTopProducts();

        res.json({
            success: true,
            data: products
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch top products"
        });

    }

}

async function getCategorySales(req, res) {

    try {

        const data = await analyticsService.getCategorySales();

        res.json({
            success: true,
            data
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch category sales"
        });

    }

}

module.exports = {
    getSummary,
    getTopProducts,
    getCategorySales
};