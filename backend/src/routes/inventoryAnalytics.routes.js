const express=require("express");

const router=express.Router();

const service =
require("../services/inventoryAnalytics.service");



router.get("/kpis",async(req,res)=>{

    res.json({

        success:true,

        data:await service.getKPIs()

    });

});


router.get("/status",async(req,res)=>{

    res.json({

        success:true,

        data:await service.getStockStatus()

    });

});


router.get("/category",async(req,res)=>{

    res.json({

        success:true,

        data:await service.getCategoryStock()

    });

});


router.get("/low-stock",async(req,res)=>{

    res.json({

        success:true,

        data:await service.getLowStock()

    });

});


router.get("/",async(req,res)=>{

    res.json({

        success:true,

        data:await service.getInventoryTable()

    });

});


module.exports=router;