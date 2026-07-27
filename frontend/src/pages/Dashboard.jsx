import { useEffect, useState } from "react";

import DashboardLayout from "../layouts/DashboardLayout";

import StatCard from "../components/StatCard";

import {
    getCustomers,
    getProducts,
    getOrders,
    getInventory
} from "../api/services/dashboard.api";



function Dashboard() {


    const [stats,setStats] = useState({

        customers:0,

        products:0,

        orders:0,

        inventory:0

    });



    useEffect(()=>{


        async function loadData(){


            const customers =
                await getCustomers();


            const products =
                await getProducts();


            const orders =
                await getOrders();


            const inventory =
                await getInventory();



            setStats({

                customers:
                    customers.count,


                products:
                    products.count,


                orders:
                    orders.count,


                inventory:
                    inventory.count

            });


        }


        loadData();


    },[]);



    return (

        <DashboardLayout>


            <h1>
                StreamForge Dashboard
            </h1>

    <div
        style={{
            display:"flex",
            gap:"20px",
            flexWrap:"wrap"
        }}
    >


        <StatCard
            title="Customers"
            value={stats.customers}
            icon="👥"
        />


        <StatCard
            title="Products"
            value={stats.products}
            icon="📦"
        />


        <StatCard
            title="Orders"
            value={stats.orders}
            icon="🛒"
        />


        <StatCard
            title="Inventory Items"
            value={stats.inventory}
            icon="🏷️"
        />


    </div>

        </DashboardLayout>

    );

}


export default Dashboard;