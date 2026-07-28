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