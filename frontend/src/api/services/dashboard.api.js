import apiClient from "../client";


export async function getCustomers() {

    const response = await apiClient.get(
        "/customers"
    );

    return response.data;

}

export async function getProducts() {

    const response = await apiClient.get(
        "/products"
    );

    return response.data;

}



export async function getOrders() {

    const response = await apiClient.get(
        "/orders"
    );

    return response.data;

}



export async function getInventory() {

    const response = await apiClient.get(
        "/inventory"
    );

    return response.data;

}