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

    getCustomerSegments

} from "../services/analytics.service";
import api from "../services/api";




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




export function useCustomerSegments(){

    return useQuery({

        queryKey:[
            "customer-segments"
        ],

        queryFn:getCustomerSegments

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



export const useCustomerKPIs()

export const useCustomerGrowth()

export const useCustomerSegments()

export const useTopCustomers()

export const useCustomerCities()