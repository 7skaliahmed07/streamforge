import {
    useEffect,
    useState
} from "react";


import DashboardLayout from "../layouts/DashboardLayout";

import DataTable from "../components/tables/DataTable";

import {
    getInventory
} from "../api/services/inventory.api";



function Inventory(){


    const [inventory,setInventory] =
        useState([]);



    useEffect(()=>{


        async function loadInventory(){

            const data =
                await getInventory();


            setInventory(data.data);

        }


        loadInventory();


    },[]);



    return (

        <DashboardLayout>


            <h1>
                Inventory
            </h1>


            <DataTable

                columns={[
                    "product_id",
                    "product_name",
                    "category",
                    "quantity"
                ]}

                rows={inventory}

            />


        </DashboardLayout>

    );

}


export default Inventory;