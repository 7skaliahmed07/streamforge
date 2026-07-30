const salesService = require("../services/salesAnalytics.service");

exports.getSalesKPIs = async (req,res,next)=>{

    try{

        const data = await salesService.getSalesKPIs();

        res.json({

            success:true,

            data

        });

    }catch(err){

        next(err);

    }

};


exports.getMonthlySales = async(req,res,next)=>{

    try{

        const data = await salesService.getMonthlySales();

        res.json({

            success:true,

            data

        });

    }catch(err){

        next(err);

    }

};


exports.getWeeklySales = async(req,res,next)=>{

    try{

        const data = await salesService.getWeeklySales();

        res.json({

            success:true,

            data

        });

    }catch(err){

        next(err);

    }

};


exports.getTopRevenueDays = async(req,res,next)=>{

    try{

        const data = await salesService.getTopRevenueDays();

        res.json({

            success:true,

            data

        });

    }catch(err){

        next(err);

    }

};