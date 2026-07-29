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
    ShoppingBag,
    Inventory,
    Payment,
    LocationOn,
    Storage,
    Settings
} from "@mui/icons-material";


import {
    NavLink
} from "react-router-dom";



const menu = [

    {
        section:"Analytics"
    },

    {
        label:"Overview",
        path:"/dashboard",
        icon:<Dashboard/>
    },

    {
        label:"Sales Analytics",
        path:"/sales",
        icon:<TrendingUp/>
    },

    {
        label:"Customer Analytics",
        path:"/customers",
        icon:<People/>
    },

    {
        label:"Product Analytics",
        path:"/products",
        icon:<ShoppingBag/>
    },

    {
        label:"Inventory Intelligence",
        path:"/inventory",
        icon:<Inventory/>
    },

    {
        label:"Payment Analytics",
        path:"/payments",
        icon:<Payment/>
    },

    {
        label:"Geographic Analytics",
        path:"/geography",
        icon:<LocationOn/>
    },


    {
        section:"Platform"
    },


    {
        label:"Data Platform",
        path:"/platform",
        icon:<Storage/>
    },


    {
        label:"Settings",
        path:"/settings",
        icon:<Settings/>
    }

];




export default function Sidebar(){


    return (

        <Drawer

            variant="permanent"

            sx={{

                width:260,

                flexShrink:0,


                "& .MuiDrawer-paper":{

                    width:260,

                    boxSizing:"border-box",

                    borderRight:"1px solid #e5e7eb"

                }

            }}

        >


            <Box

                sx={{

                    padding:3

                }}

            >

                <Typography

                    variant="h6"

                    fontWeight={800}
                    >

                    StreamForge

                </Typography>


                <Typography

                    variant="body2"

                    color="text.secondary"

                >

                    Enterprise Analytics Platform

                </Typography>


            </Box>



            <Divider />



            <List>


                {
                    menu.map(

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


                                        backgroundColor:"#eff6ff",


                                        color:"#2563eb",


                                        fontWeight:700,


                                        "& .MuiListItemIcon-root":{

                                        color:"#2563eb"

                                        }


}

                                    }}

                                >


                                    <ListItemIcon>

                                        {item.icon}

                                    </ListItemIcon>


                                    <ListItemText

                                        primary={
                                            item.label
                                        }

                                    />


                                </ListItemButton>

                            );


                        }

                    )

                }


            </List>


        </Drawer>

    );

}