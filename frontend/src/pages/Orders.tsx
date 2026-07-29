import {
    useEffect,
    useState
} from "react";


import DashboardLayout from "../layouts/DashboardLayout";

import DataTable from "../components/tables/DataTable";

import {
    getOrders
} from "../api/services/order.api";



function Orders(){


    const [orders,setOrders] =
        useState([]);



    useEffect(()=>{


        async function loadOrders(){

            const data =
                await getOrders();


            setOrders(data.data);

        }


        loadOrders();


    },[]);



    return (

        <DashboardLayout>


            <h1>
                Orders
            </h1>


            <DataTable

                columns={[
                    "order_id",
                    "customer_name",
                    "status",
                    "total_amount",
                    "payment_status"
                ]}

                rows={orders}

            />


        </DashboardLayout>

    );

}


export default Orders;