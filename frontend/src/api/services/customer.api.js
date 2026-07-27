import apiClient from "../client";


export async function getCustomers(){

    const response =
        await apiClient.get("/customers");


    return response.data;

}