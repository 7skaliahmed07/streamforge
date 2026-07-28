import api from "./api";


export interface AnalyticsSummary {

    totalOrders: number;

    totalCustomers: number;

    totalRevenue: number;

    averageOrderValue: number;

    totalProducts: number;

}



export interface TopProduct {

    name: string;

    category: string;

    unitsSold: number;

    revenue: number;

}



export interface CategorySales {

    category: string;

    unitsSold: number;

    revenue: number;

}



export interface PaymentMethod {

    paymentMethod: string;

    transactions: number;

    revenue: number;

}



export interface RevenueTrend {

    date: string;

    revenue: number;

    orders: number;

}



export interface InventoryStatus {

    name: string;

    category: string;

    quantity: number;

}



export interface CitySales {

    city: string;

    orders: number;

    revenue: number;

}



export interface CustomerSegment {

    segment: string;

    customers: number;

}



/*
    Dashboard Summary
*/

export async function getSummary(){

    const response = await api.get<{
        success:boolean;
        data:AnalyticsSummary;
    }>(
        "/analytics/summary"
    );


    return response.data.data;

}



/*
    Top Products
*/

export async function getTopProducts(){

    const response = await api.get<{
        success:boolean;
        data:TopProduct[];
    }>(
        "/analytics/top-products"
    );


    return response.data.data;

}



/*
    Category Sales
*/

export async function getCategorySales(){

    const response = await api.get<{
        success:boolean;
        data:CategorySales[];
    }>(
        "/analytics/category-sales"
    );


    return response.data.data;

}



/*
    Payment Analytics
*/

export async function getPaymentMethods(){

    const response = await api.get<{
        success:boolean;
        data:PaymentMethod[];
    }>(
        "/analytics/payment-methods"
    );


    return response.data.data;

}



/*
    Revenue Trend
*/

export async function getRevenueTrend(){

    const response = await api.get<{
        success:boolean;
        data:RevenueTrend[];
    }>(
        "/analytics/revenue-trend"
    );


    return response.data.data;

}



/*
    Inventory
*/

export async function getInventoryStatus(){

    const response = await api.get<{
        success:boolean;
        data:InventoryStatus[];
    }>(
        "/analytics/inventory-status"
    );


    return response.data.data;

}



/*
    City Sales
*/

export async function getCitySales(){

    const response = await api.get<{
        success:boolean;
        data:CitySales[];
    }>(
        "/analytics/city-sales"
    );


    return response.data.data;

}



/*
    Customer Segments
*/

export async function getCustomerSegments(){

    const response = await api.get<{
        success:boolean;
        data:CustomerSegment[];
    }>(
        "/analytics/customer-segments"
    );


    return response.data.data;

}