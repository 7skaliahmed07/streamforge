import {
    useEffect,
    useState
} from "react";


import DashboardLayout from "../layouts/DashboardLayout";

import DataTable from "../components/tables/DataTable";

import {
    getCustomers
} from "../api/services/customer.api";



function Customers(){


    const [customers,setCustomers] =
        useState([]);



    useEffect(()=>{


        async function loadCustomers(){

            const data =
                await getCustomers();


            setCustomers(data.data);

        }


        loadCustomers();


    },[]);



    return (

        <DashboardLayout>


            <h1>
                Customers
            </h1>


            <DataTable

                columns={[
                    "id",
                    "first_name",
                    "last_name",
                    "email",
                    "phone"
                ]}

                rows={customers}

            />


        </DashboardLayout>

    );

}


export default Customers;