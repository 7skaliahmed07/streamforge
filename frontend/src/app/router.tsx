import {
    createBrowserRouter
} from "react-router-dom";


import DashboardLayout
from "../layouts/DashboardLayout";


import Overview
from "../pages/Overview";


import SalesAnalytics
from "../pages/SalesAnalytics";


import CustomerAnalytics
from "../pages/CustomerAnalytics";


import ProductAnalytics
from "../pages/ProductAnalytics";


import InventoryAnalytics
from "../pages/InventoryAnalytics";


import PaymentAnalytics
from "../pages/PaymentAnalytics";


import GeographicAnalytics
from "../pages/GeographicAnalytics";



const router = createBrowserRouter([


    {

        path:"/",

        element:<DashboardLayout />,

        children:[


            {
                index:true,
                element:<Overview />
            },


            {
                path:"dashboard",
                element:<Overview />
            },


            {
                path:"sales",
                element:<SalesAnalytics />
            },


            {
                path:"customers",
                element:<CustomerAnalytics />
            },


            {
                path:"products",
                element:<ProductAnalytics />
            },


            {
                path:"inventory",
                element:<InventoryAnalytics />
            },


            {
                path:"payments",
                element:<PaymentAnalytics />
            },


            {
                path:"geography",
                element:<GeographicAnalytics />
            }


        ]

    }


]);


export default router;