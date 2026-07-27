import apiClient from "../client";


export async function getOrders(){

    const response =
        await apiClient.get("/orders");


    return response.data;

}