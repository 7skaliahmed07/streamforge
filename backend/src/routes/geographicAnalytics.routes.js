const express=require("express");

const router=express.Router();


const controller =
require("../controllers/geographicAnalytics.controller");



router.get(
"/kpis",
controller.getKPIs
);


router.get(
"/customers-country",
controller.getCustomersByCountry
);


router.get(
"/customers-city",
controller.getCustomersByCity
);


router.get(
"/revenue-city",
controller.getRevenueByCity
);



module.exports=router;