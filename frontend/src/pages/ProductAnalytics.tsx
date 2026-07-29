import {
    useEffect,
    useState
} from "react";


import DashboardLayout from "../layouts/DashboardLayout";

import DataTable from "../components/tables/DataTable";

import {
    getProducts
} from "../api/services/product.api";



function Products(){


    const [products,setProducts] =
        useState([]);



    useEffect(()=>{


        async function loadProducts(){

            const data =
                await getProducts();


            setProducts(data.data);

        }


        loadProducts();


    },[]);



    return (

        <DashboardLayout>


            <h1>
                Products
            </h1>


            <DataTable

                columns={[
                    "id",
                    "name",
                    "category",
                    "price"
                ]}

                rows={products}

            />


        </DashboardLayout>

    );

}


export default Products;