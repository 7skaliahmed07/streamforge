import apiClient from "../client";


export async function getInventory(){

    const response =
        await apiClient.get("/inventory");


    return response.data;

}