import {

    AppBar,

    Toolbar,

    Typography,

    Box,

    IconButton

} from "@mui/material";


import NotificationsIcon from "@mui/icons-material/Notifications";


import { drawerWidth } from "./Sidebar";


function Topbar(){


    return (

        <AppBar

            position="fixed"

            sx={{

                width:`calc(100% - ${drawerWidth}px)`,

                ml:`${drawerWidth}px`,

                background:"#ffffff",

                color:"#1e293b",

                boxShadow:"none",

                borderBottom:"1px solid #e2e8f0"

            }}

        >

            <Toolbar>


                <Typography

                    variant="h6"

                    fontWeight={700}

                >

                    Dashboard

                </Typography>


                <Box flexGrow={1}/>


                <IconButton>

                    <NotificationsIcon />

                </IconButton>


            </Toolbar>


        </AppBar>

    );


}


export default Topbar;