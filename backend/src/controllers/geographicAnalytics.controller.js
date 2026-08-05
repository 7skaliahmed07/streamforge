const service =
require("../services/geographicAnalytics.service");



exports.getKPIs = async(req,res)=>{

    try{

        res.json({

            success:true,

            data:
            await service.getKPIs()

        });


    }catch(error){

        res.status(500).json({

            success:false,

            message:error.message

        });

    }

};



exports.getCustomersByCountry = async(req,res)=>{

    try{

        res.json({

            success:true,

            data:
            await service.getCustomersByCountry()

        });


    }catch(error){

        res.status(500).json({

            success:false,

            message:error.message

        });

    }

};



exports.getCustomersByCity = async(req,res)=>{

    try{

        res.json({

            success:true,

            data:
            await service.getCustomersByCity()

        });


    }catch(error){

        res.status(500).json({

            success:false,

            message:error.message

        });

    }

};



exports.getRevenueByCity = async(req,res)=>{

    try{

        res.json({

            success:true,

            data:
            await service.getRevenueByCity()

        });


    }catch(error){

        res.status(500).json({

            success:false,

            message:error.message

        });

    }

};