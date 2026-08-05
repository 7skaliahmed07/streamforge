import { motion } from "framer-motion";
import {

    Typography,

    Box

} from "@mui/material";


import {

    useSummary,

    useRevenueTrend,

    useCategorySales,

    usePaymentMethods,
    
    useCitySales,

    useTopProducts,

    useInventoryStatus,

    useCustomerSegments

} from "../hooks/useAnalytics";


import KPIGrid from "../components/dashboard/KPIGrid";

import RevenueTrendChart from "../components/charts/RevenueTrendChart";

import CategorySalesChart from "../components/charts/CategorySalesChart";

import PaymentMethodsChart from "../components/charts/PaymentMethodsChart";

import CitySalesChart from "../components/charts/CitySalesChart";

import TopProductsTable from "../components/tables/TopProductsTable";

import InventoryRiskTable from "../components/tables/InventoryRiskTable";

import CustomerSegmentChart from "../components/charts/CustomerSegmentChart";


function Overview(){


    const {

        data:summary,

        isLoading:summaryLoading


    } = useSummary();


    const {
        data:categorySales,

        isLoading:categoryLoading

    } = useCategorySales();



    const {

        data:revenueTrend,

        isLoading:trendLoading


    } = useRevenueTrend();


    const {

        data:paymentMethods,

        isLoading:paymentLoading


    } = usePaymentMethods();


    const {

        data:citySales,

        isLoading:cityLoading


    } = useCitySales();

    const {

        data:topProducts,

        isLoading:productsLoading

    } = useTopProducts();

    const {

    data:inventoryStatus,

    isLoading:inventoryLoading

    } = useInventoryStatus();


    const {

    data:customerSegments,

    isLoading:customerLoading

    } = useCustomerSegments();




    if(

    summaryLoading ||

    trendLoading ||

    categoryLoading ||

    paymentLoading ||

    cityLoading ||
    
    productsLoading ||

    inventoryLoading ||

    customerLoading

    ){

        return (

            <Typography>

                Loading Overview please wait...

            </Typography>

        );

    }


    const customerSegmentData = customerSegments.map(
    (item:any)=>({

        ...item,

        customers:Number(item.customers)

    })
);



    return (
        <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8}}
        >

        <Box>


            <Typography

                variant="h4"

                fontWeight={700}

                mb={4}

            >

                Overview

            </Typography>



            <KPIGrid

                data={summary}

            />



            <RevenueTrendChart

                data={revenueTrend || []}

            />

            <CategorySalesChart

                data={categorySales || []}
            />

            <PaymentMethodsChart

                data={paymentMethods || []}

            />

            <CitySalesChart

                data={citySales || []}

            />

            <TopProductsTable

                data={topProducts  || []}

            />

            <InventoryRiskTable

                data={inventoryStatus || []}

            />

            <CustomerSegmentChart

            data={customerSegmentData || []}

            />

        </Box>
        </motion.div>

    );


}



export default Overview;