import {
    Outlet
} from "react-router-dom";


import {
    Box
} from "@mui/material";


import Sidebar from "./Sidebar";

import Header from "./Header";



function DashboardLayout(){


    return (

        <Box

            sx={{

                display:"flex",

                minHeight:"100vh"

            }}

        >


            <Sidebar />


            <Box

                sx={{

                    flexGrow:1

                }}

            >


                <Header />


                <Box

                    component="main"

                    sx={{

                        p:4,

                        mt:"64px",

                        background:"#f8fafc",

                        minHeight:"calc(100vh - 64px)"

                    }}

                >


                    <Outlet />


                </Box>


            </Box>


        </Box>

    );

}



export default DashboardLayout;