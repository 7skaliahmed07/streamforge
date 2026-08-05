import api from "./api";


export interface GeographicKPI {

    total_countries:string;

    total_cities:string;

    top_country:string;

    top_city:string;

}


export interface CustomersByCountry {

    country:string;

    customers:string;

}


export interface CustomersByCity {

    city:string;

    customers:string;

}


export interface RevenueByCity {

    city:string;

    customers:string;

    revenue:string;

}



// KPI

export async function getGeographicKPIs(){

    const response =
        await api.get<{

            success:boolean;

            data:GeographicKPI;

        }>("/geographic/kpis");


    return response.data.data;

}



// Country

export async function getCustomersByCountry(){

    const response =
        await api.get<{

            success:boolean;

            data:CustomersByCountry[];

        }>("/geographic/customers-country");


    return response.data.data;

}



// City

export async function getCustomersByCity(){

    const response =
        await api.get<{

            success:boolean;

            data:CustomersByCity[];

        }>("/geographic/customers-city");


    return response.data.data;

}



// Revenue

export async function getRevenueByCity(){

    const response =
        await api.get<{

            success:boolean;

            data:RevenueByCity[];

        }>("/geographic/revenue-city");


    return response.data.data;

}