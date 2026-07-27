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

async function getPaymentMethods(req, res) {

    try {

        const data =
            await analyticsService.getPaymentMethods();

        res.json({
            success: true,
            data
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch payment analytics"
        });

    }

}
async function getRevenueTrend(req,res){

    try{

        const data =
            await analyticsService.getRevenueTrend();

        res.json({
            success:true,
            data
        });

    }catch(error){

        console.error(error);

        res.status(500).json({
            success:false,
            message:"Failed to fetch revenue trend"
        });

    }

}

async function getCitySales(req, res) {
    try {
        const data = await analyticsService.getCitySales();

        res.json({
            success: true,
            data
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch city sales"
        });
    }
}

async function getInventoryStatus(req, res) {
    try {
        const data = await analyticsService.getInventoryStatus();

        res.json({
            success: true,
            data
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch inventory status"
        });
    }
}


async function getCustomerSegments(req, res) {
    try {
        const data = await analyticsService.getCustomerSegments();

        res.json({
            success: true,
            data
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch customer segments"
        });
    }
}

module.exports = {
    getSummary,
    getTopProducts,
    getCategorySales,
    getPaymentMethods,
    getRevenueTrend,
    getInventoryStatus,
    getCitySales,
    getCustomerSegments,

};