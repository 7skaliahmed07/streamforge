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

    // getCustomerSegments

} from "../services/analytics.service";
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




// export function useCustomerSegments(){

//     return useQuery({

//         queryKey:[
//             "customer-segments"
//         ],

//         queryFn:getCustomerSegments

//     });

// }






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