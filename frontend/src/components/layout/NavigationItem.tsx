import {
    ListItemButton,
    ListItemIcon,
    ListItemText
} from "@mui/material";

import { NavLink } from "react-router-dom";


interface Props {

    label: string;

    icon: React.ReactNode;

    path: string;

}


function NavigationItem({
    label,
    icon,
    path
}: Props) {


    return (

        <ListItemButton

            component={NavLink}

            to={path}

            sx={{

                borderRadius: 2,

                mb: 0.5,

                "&.active": {

                    backgroundColor: "primary.main",

                    color: "white",

                    "& .MuiListItemIcon-root": {

                        color: "white"

                    }

                }

            }}

        >

            <ListItemIcon>

                {icon}

            </ListItemIcon>


            <ListItemText

                primary={label}

            />


        </ListItemButton>

    );

}


export default NavigationItem;