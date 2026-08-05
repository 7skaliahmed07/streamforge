import api from "./api";


export interface PaymentKPI {

    total_payments:string;

    successful_payments:string;

    failed_payments:string;

    total_revenue:string;

}



export interface PaymentMethod {

    payment_method:string;

    payments:string;

    revenue:string;

}



export interface PaymentStatus {

    payment_status:string;

    payments:string;

}



export interface MonthlyPaymentRevenue {

    month:string;

    revenue:string;

}



export async function getPaymentKPIs(){

    const response =
        await api.get<{

            success:boolean;

            data:PaymentKPI;

        }>(
            "/payments/analytics/kpis"
        );


    return response.data.data;

}





export async function getPaymentMethods(){

    const response =
        await api.get<{

            success:boolean;

            data:PaymentMethod[];

        }>(
            "/payments/analytics/methods"
        );


    return response.data.data;

}





export async function getPaymentStatus(){

    const response =
        await api.get<{

            success:boolean;

            data:PaymentStatus[];

        }>(
            "/payments/analytics/status"
        );


    return response.data.data;

}





export async function getMonthlyPaymentRevenue(){

    const response =
        await api.get<{

            success:boolean;

            data:MonthlyPaymentRevenue[];

        }>(
            "/payments/analytics/monthly-revenue"
        );


    return response.data.data;

}