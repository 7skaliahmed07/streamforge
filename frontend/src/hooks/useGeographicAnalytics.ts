import {
    useQuery
} from "@tanstack/react-query";


import {

    getGeographicKPIs,

    getCustomersByCountry,

    getCustomersByCity,

    getRevenueByCity


} from "../services/geographic.service";




export function useGeographicKPIs(){

    return useQuery({

        queryKey:[
            "geographic-kpis"
        ],

        queryFn:getGeographicKPIs

    });

}





export function useCustomersByCountry(){

    return useQuery({

        queryKey:[
            "customers-country"
        ],

        queryFn:getCustomersByCountry

    });

}





export function useCustomersByCity(){

    return useQuery({

        queryKey:[
            "customers-city"
        ],

        queryFn:getCustomersByCity

    });

}





export function useRevenueByCity(){

    return useQuery({

        queryKey:[
            "revenue-city"
        ],

        queryFn:getRevenueByCity

    });

}