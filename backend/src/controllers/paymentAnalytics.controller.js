const service =
require("../services/paymentAnalytics.service");



exports.getKPIs = async(req,res)=>{

    try{

        const data =
        await service.getKPIs();


        res.json({

            success:true,

            data

        });


    }catch(error){

        res.status(500).json({

            success:false,

            error:error.message

        });

    }

};




exports.getMethods = async(req,res)=>{

    try{

        const data =
        await service.getMethods();


        res.json({

            success:true,

            data

        });


    }catch(error){

        res.status(500).json({

            success:false,

            error:error.message

        });

    }

};




exports.getStatus = async(req,res)=>{

    try{

        const data =
        await service.getStatus();


        res.json({

            success:true,

            data

        });


    }catch(error){

        res.status(500).json({

            success:false,

            error:error.message

        });

    }

};





exports.getMonthlyRevenue = async(req,res)=>{

    try{

        const data =
        await service.getMonthlyRevenue();


        res.json({

            success:true,

            data

        });


    }catch(error){

        res.status(500).json({

            success:false,

            error:error.message

        });

    }

};