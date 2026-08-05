import {
    useQuery
} from "@tanstack/react-query";


import {

    getSummary,

    getTopProducts,

    getCategorySales,

    getPaymentMethods,

    getRevenueTrend,

    getInventoryStatus,

    getCitySales,

    getInventoryStockStatus,


    


} from "../services/analytics.service";


import {

    getPaymentKPIs,

    getPaymentStatus,

    getMonthlyPaymentRevenue

} from "../services/payment.service";


import api from "../services/api";

import axios from "axios";

const API = "http://localhost:5001/api/v1";



export function useSummary(){

    return useQuery({

        queryKey:[
            "analytics-summary"
        ],

        queryFn:getSummary

    });

}




export function useTopProducts(){

    return useQuery({

        queryKey:[
            "top-products"
        ],

        queryFn:getTopProducts

    });

}




export function useCategorySales(){

    return useQuery({

        queryKey:[
            "category-sales"
        ],

        queryFn:getCategorySales

    });

}




export function usePaymentMethods(){

    return useQuery({

        queryKey:[
            "payment-methods"
        ],

        queryFn:getPaymentMethods

    });

}




export function useRevenueTrend(){

    return useQuery({

        queryKey:[
            "revenue-trend"
        ],

        queryFn:getRevenueTrend

    });

}




export function useInventoryStatus(){

    return useQuery({

        queryKey:[
            "inventory-status"
        ],

        queryFn:getInventoryStatus

    });

}




export function useCitySales(){

    return useQuery({

        queryKey:[
            "city-sales"
        ],

        queryFn:getCitySales

    });

}



export function useInventoryStockStatus(){

    return useQuery({

        queryKey:[
            "inventory-stock-status"
        ],

        queryFn:getInventoryStockStatus

    });

}






export function useSalesKPIs(){

    return useQuery({

        queryKey:["sales-kpis"],

        queryFn: async()=>{

            const response =
                await api.get(
                    "/sales/kpis"
                );

            return response.data.data;

        }

    });

}



export function useMonthlySales(){

    return useQuery({

        queryKey:["monthly-sales"],

        queryFn: async()=>{

            const response =
                await api.get(
                    "/sales/monthly"
                );

            return response.data.data;

        }

    });

}



export function useWeeklySales(){

    return useQuery({

        queryKey:["weekly-sales"],

        queryFn: async()=>{

            const response =
                await api.get(
                    "/sales/weekly"
                );

            return response.data.data;

        }

    });

}



export function useTopRevenueDays(){

    return useQuery({

        queryKey:["top-revenue-days"],

        queryFn: async()=>{

            const response =
                await api.get(
                    "/sales/top-days"
                );

            return response.data.data;

        }

    });

}

export function useCustomerKPIs(){

    return useQuery({

        queryKey:["customer-kpis"],

        queryFn: async()=>{

            const response =
                await api.get(
                    "/customers/analytics/kpis"
                );

            return response.data.data;

        }

    });

}



export function useCustomerGrowth(){

    return useQuery({

        queryKey:["customer-growth"],

        queryFn: async()=>{

            const response =
                await api.get(
                    "/customers/analytics/growth"
                );

            return response.data.data;

        }

    });

}



export function useCustomerSegments(){

    return useQuery({

        queryKey:["customer-segments"],

        queryFn: async()=>{

            const response =
                await api.get(
                    "/customers/analytics/segments"
                );

            return response.data.data;

        }

    });

}



export function useCustomerCities(){

    return useQuery({

        queryKey:["customer-cities"],

        queryFn: async()=>{

            const response =
                await api.get(
                    "/customers/analytics/cities"
                );

            return response.data.data;

        }

    });

}



export function useTopCustomers(){

    return useQuery({

        queryKey:["top-customers"],

        queryFn: async()=>{

            const response =
                await api.get(
                    "/customers/analytics/top-customers"
                );

            return response.data.data;

        }

    });

}

export function useProductKPIs() {

    return useQuery({

        queryKey:["product-kpis"],

        queryFn: async()=>{

            const response =
                await api.get(
                    "/products/analytics/kpis"
                );

            return response.data.data;

        }

    });

}



export function useProductRevenue(){

    return useQuery({

        queryKey:["product-revenue"],

        queryFn: async()=>{

            const response =
                await api.get(
                    "/products/analytics/monthly-revenue"
                );

            return response.data.data;

        }

    });

}



export function useCategoryRevenue(){

    return useQuery({

        queryKey:["category-revenue"],

        queryFn: async()=>{

            const response =
                await api.get(
                    "/products/analytics/categories"
                );

            return response.data.data;

        }

    });

}



export function useBrandRevenue(){

    return useQuery({

        queryKey:["brand-revenue"],

        queryFn: async()=>{

            const response =
                await api.get(
                    "/products/analytics/brands"
                );

            return response.data.data;

        }

    });

}



export function useInventoryValue(){

    return useQuery({

        queryKey:["inventory-value"],

        queryFn: async()=>{

            const response =
                await api.get(
                    "/products/analytics/inventory-value"
                );

            return response.data.data;

        }

    });

}



export function useLowStockProducts(){

    return useQuery({

        queryKey:["low-stock-products"],

        queryFn: async()=>{

            const response =
                await api.get(
                    "/products/analytics/low-stock"
                );

            return response.data.data;

        }

    });

}



export function usePricingDistribution(){

    return useQuery({

        queryKey:["pricing-distribution"],

        queryFn: async()=>{

            const response =
                await api.get(
                    "/products/analytics/pricing"
                );

            return response.data.data;

        }

    });

}



export function useTopProductsAnalytics(){

    return useQuery({

        queryKey:["top-products-analytics"],

        queryFn: async()=>{

            const response =
                await api.get(
                    "/products/analytics/top-products"
                );

            return response.data.data;

        }

    });

}


export function useProductPricing(){

    return useQuery({

        queryKey:["product-pricing"],

        queryFn: async()=>{

            const response =
                await api.get(
                    "/products/analytics/pricing"
                );

            return response.data.data;

        }

    });

}



export function useInventoryKPIs(){

    return useQuery({

        queryKey:["inventory-kpis"],

        queryFn: async()=>{

            const response =
                await api.get(
                    "/inventory/analytics/kpis"
                );

            return response.data.data;

        }

    });

}




// export function useInventoryStatus(){

//     return useQuery({

//         queryKey:["inventory-status"],

//         queryFn: async()=>{

//             const response =
//                 await api.get(
//                     "/inventory/analytics/status"
//                 );

//             return response.data.data;

//         }

//     });

// }




export function useInventoryCategory(){

    return useQuery({

        queryKey:["inventory-category"],

        queryFn: async()=>{

            const response =
                await api.get(
                    "/inventory/analytics/category"
                );

            return response.data.data;

        }

    });

}




export function useInventoryLowStock(){

    return useQuery({

        queryKey:["inventory-low-stock"],

        queryFn: async()=>{

            const response =
                await api.get(
                    "/inventory/analytics/low-stock"
                );

            return response.data.data;

        }

    });

}



export function usePaymentAnalyticsKPIs(){

    return useQuery({

        queryKey:[
            "payment-kpis"
        ],

        queryFn:getPaymentKPIs

    });

}



export function usePaymentAnalyticsMethods(){

    return useQuery({

        queryKey:[
            "payment-analytics-methods"
        ],

        queryFn:getPaymentMethods

    });

}



export function usePaymentAnalyticsStatus(){

    return useQuery({

        queryKey:[
            "payment-analytics-status"
        ],

        queryFn:getPaymentStatus

    });

}



export function usePaymentMonthlyRevenue(){

    return useQuery({

        queryKey:[
            "monthly-payment-revenue"
        ],

        queryFn:getMonthlyPaymentRevenue

    });

}