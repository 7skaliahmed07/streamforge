import {
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Divider,
    Typography,
    Box
} from "@mui/material";


import {
    Dashboard,
    TrendingUp,
    People,
    Inventory,
    Payment,
    LocationOn,
    ShoppingBag,
    Storage,
    Settings
} from "@mui/icons-material";


import {
    NavLink
} from "react-router-dom";



const menuItems = [

    {
        section:"Analytics"
    },

    {
        text:"Overview",
        path:"/dashboard",
        icon:<Dashboard/>
    },

    {
        text:"Sales Analytics",
        path:"/sales",
        icon:<TrendingUp/>
    },

    {
        text:"Customer Analytics",
        path:"/customers",
        icon:<People/>
    },

    {
        text:"Product Analytics",
        path:"/products",
        icon:<ShoppingBag/>
    },

    {
        text:"Inventory Intelligence",
        path:"/inventory",
        icon:<Inventory/>
    },

    {
        text:"Payment Analytics",
        path:"/payments",
        icon:<Payment/>
    },

    {
        text:"Geographic Analytics",
        path:"/geography",
        icon:<LocationOn/>
    },


    {
        section:"Platform"
    },


    {
        text:"Data Platform",
        path:"/platform",
        icon:<Storage/>
    },


    {
        text:"Settings",
        path:"/settings",
        icon:<Settings/>
    }

];




function Sidebar(){


    return (

        <Drawer

            variant="permanent"

            sx={{

                width:260,

                "& .MuiDrawer-paper":{
                    width:260,
                    boxSizing:"border-box",
                    paddingTop:2
                }

            }}

        >


            <Box

                sx={{
                    px:3,
                    mb:3
                }}

            >

                <Typography

                    variant="h6"

                    fontWeight={800}

                >

                    🚀 StreamForge

                </Typography>


                <Typography

                    variant="caption"

                    color="text.secondary"

                >

                    Retail Intelligence Platform

                </Typography>


            </Box>



            <Divider />



            <List>


            {
                menuItems.map(
                    (item,index)=>{


                    if(item.section){


                        return (

                            <Typography

                                key={index}

                                sx={{
                                    px:3,
                                    py:2,
                                    fontSize:12,
                                    fontWeight:700,
                                    color:"gray"
                                }}

                            >

                                {item.section}

                            </Typography>

                        );


                    }



                    return (

                        <ListItemButton

                            key={item.path}

                            component={NavLink}

                            to={item.path}

                            sx={{

                                mx:1,

                                borderRadius:2,


                                "&.active":{

                                    backgroundColor:
                                    "#e3f2fd"

                                }

                            }}

                        >


                            <ListItemIcon>

                                {item.icon}

                            </ListItemIcon>


                            <ListItemText

                                primary={
                                    item.text
                                }

                            />


                        </ListItemButton>

                    );


                })

            }


            </List>


        </Drawer>

    );

}


export default Sidebar;