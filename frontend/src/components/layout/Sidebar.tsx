import {

    Drawer,

    Box,

    Typography,

    List

} from "@mui/material";


import DashboardIcon from "@mui/icons-material/Dashboard";

import AnalyticsIcon from "@mui/icons-material/Analytics";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import PeopleIcon from "@mui/icons-material/People";

import InventoryIcon from "@mui/icons-material/Inventory";

import CategoryIcon from "@mui/icons-material/Category";


import NavigationItem from "./NavigationItem";


const drawerWidth = 260;


function Sidebar() {


    const menu = [

        {
            label: "Dashboard",
            path: "/",
            icon: <DashboardIcon />
        },

        {
            label: "Analytics",
            path: "/analytics",
            icon: <AnalyticsIcon />
        },

        {
            label: "Orders",
            path: "/orders",
            icon: <ShoppingCartIcon />
        },

        {
            label: "Customers",
            path: "/customers",
            icon: <PeopleIcon />
        },

        {
            label: "Products",
            path: "/products",
            icon: <CategoryIcon />
        },

        {
            label: "Inventory",
            path: "/inventory",
            icon: <InventoryIcon />
        }

    ];


    return (

        <Drawer

            variant="permanent"

            sx={{

                width: drawerWidth,

                flexShrink: 0,

                "& .MuiDrawer-paper": {

                    width: drawerWidth,

                    boxSizing: "border-box",

                    borderRight: "1px solid #e2e8f0"

                }

            }}

        >

            <Box

                sx={{

                    p:3

                }}

            >

                <Typography

                    variant="h5"

                    fontWeight={800}

                    color="primary"

                >

                    StreamForge

                </Typography>


                <Typography

                    variant="caption"

                    color="text.secondary"

                >

                    Retail Intelligence Platform

                </Typography>


            </Box>


            <List

                sx={{

                    px:2

                }}

            >

                {

                    menu.map(item => (

                        <NavigationItem

                            key={item.label}

                            {...item}

                        />

                    ))

                }

            </List>


        </Drawer>

    );

}


export {

    drawerWidth

};


export default Sidebar;