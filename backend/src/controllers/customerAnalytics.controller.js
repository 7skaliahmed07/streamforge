const customerAnalyticsService = require("../services/customerAnalytics.service");



exports.getKPIs = async (req, res) => {

    try {

        const data =
            await customerAnalyticsService.getKPIs();

        res.json({
            success: true,
            data
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal server error"
        });

    }

};





exports.getGrowth = async (req, res) => {

    try {

        const data =
            await customerAnalyticsService.getGrowth();

        res.json({
            success: true,
            data
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal server error"
        });

    }

};





exports.getSegments = async (req, res) => {

    try {

        const data =
            await customerAnalyticsService.getSegments();

        res.json({
            success: true,
            data
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal server error"
        });

    }

};





exports.getTopCustomers = async (req, res) => {

    try {

        const data =
            await customerAnalyticsService.getTopCustomers();

        res.json({
            success: true,
            data
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal server error"
        });

    }

};





exports.getCities = async (req, res) => {

    try {

        const data =
            await customerAnalyticsService.getCities();

        res.json({
            success: true,
            data
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal server error"
        });

    }

};