import {
    useQuery
} from "@tanstack/react-query";


import {

    getPaymentKPIs,

    getPaymentMethods,

    getPaymentStatus,

    getMonthlyPaymentRevenue


} from "../services/payment.service";





export function usePaymentKPIs(){

    return useQuery({

        queryKey:[
            "payment-kpis"
        ],

        queryFn:getPaymentKPIs

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





export function usePaymentStatus(){

    return useQuery({

        queryKey:[
            "payment-status"
        ],

        queryFn:getPaymentStatus

    });

}





export function useMonthlyPaymentRevenue(){

    return useQuery({

        queryKey:[
            "monthly-payment-revenue"
        ],

        queryFn:getMonthlyPaymentRevenue

    });

}