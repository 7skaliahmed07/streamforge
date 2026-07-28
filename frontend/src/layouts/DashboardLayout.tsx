import {

    Box,

    Toolbar

} from "@mui/material";


import Sidebar from "../components/layout/Sidebar";

import Topbar from "../components/layout/Topbar";


function DashboardLayout({

    children

}:{

    children:React.ReactNode

}){


    return (

        <Box

            sx={{

                display:"flex"

            }}

        >

            <Sidebar />


            <Topbar />


            <Box

                component="main"

                sx={{

                    flexGrow:1,

                    p:3,

                    minHeight:"100vh",

                    background:"#f8fafc"

                }}

            >

                <Toolbar/>


                {children}


            </Box>


        </Box>

    );

}


export default DashboardLayout;