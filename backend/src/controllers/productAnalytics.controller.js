const service = require("../services/productAnalytics.service");

exports.getKPIs = async (req, res) => {

    try {

        const data = await service.getKPIs();

        res.json({
            success: true,
            data
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch product KPIs"
        });

    }

};


exports.getMonthlyRevenue = async (req, res) => {

    try {

        const data = await service.getMonthlyRevenue();

        res.json({
            success: true,
            data
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false
        });

    }

};


exports.getCategories = async (req, res) => {

    try {

        const data = await service.getCategories();

        res.json({
            success: true,
            data
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false
        });

    }

};


exports.getBrands = async (req, res) => {

    try {

        const data = await service.getBrands();

        res.json({
            success: true,
            data
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false
        });

    }

};


exports.getTopProducts = async (req, res) => {

    try {

        const data = await service.getTopProducts();

        res.json({
            success: true,
            data
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false
        });

    }

};


exports.getInventoryValue = async (req, res) => {

    try {

        const data = await service.getInventoryValue();

        res.json({
            success: true,
            data
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false
        });

    }

};


exports.getLowStock = async (req, res) => {

    try {

        const data = await service.getLowStock();

        res.json({
            success: true,
            data
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false
        });

    }

};


exports.getPricing = async (req, res) => {

    try {

        const data = await service.getPricing();

        res.json({
            success: true,
            data
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false
        });

    }

};