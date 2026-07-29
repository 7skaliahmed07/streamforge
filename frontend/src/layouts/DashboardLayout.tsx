import {
    Outlet
} from "react-router-dom";


import {
    Box
} from "@mui/material";


import Sidebar
from "./Sidebar";


import Header
from "./Header";




export default function DashboardLayout(){


    return (

        <Box

            sx={{

                display:"flex"

            }}

        >


            <Header />


            <Sidebar />


                    <Box

                    component="main"

                    sx={{

                        flexGrow:1,

                        p:4,

                        // ml:"260px",

                        mt:"64px",

                        background:"#f8fafc",

                        minHeight:"100vh"

                    }}

        >

            <Outlet />  

        </Box>



        </Box>

    );

}