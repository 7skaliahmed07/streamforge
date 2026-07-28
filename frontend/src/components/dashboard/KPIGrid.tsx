import {

    Grid

} from "@mui/material";


// import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
// import EuroSymbolIcon from '@mui/icons-material/EuroSymbolIcon';
import EuroSymbol from '@mui/icons-material/EuroSymbol';

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import PeopleIcon from "@mui/icons-material/People";

import InventoryIcon from "@mui/icons-material/Inventory";

import TrendingUpIcon from "@mui/icons-material/TrendingUp";

import {
    formatCurrency
} from "../../utils/formatters";

import KPICard from "./KPICard";



interface Props {

    data:any;

}



function KPIGrid({

    data

}:Props){


    const cards = [

        {

            title:"Total Revenue",

            value:formatCurrency(
                data.totalRevenue),

            // icon:<AttachMoneyIcon/>,
            icon:<EuroSymbol/>,

            color:"#2563eb"

        },


        {

            title:"Total Orders",

            value:

            data.totalOrders.toLocaleString(),

            icon:<ShoppingCartIcon/>,

            color:"#16a34a"

        },


        {

            title:"Customers",

            value:

            data.totalCustomers.toLocaleString(),

            icon:<PeopleIcon/>,

            color:"#9333ea"

        },


        {

            title:"Products",

            value:

            data.totalProducts.toLocaleString(),

            icon:<InventoryIcon/>,

            color:"#ea580c"

        },


        {

            title:"Average Order Value",

            value: formatCurrency(data.averageOrderValue),

            icon:<TrendingUpIcon/>,

            color:"#0891b2"

        }

    ];



    return (

        <Grid

            container

            spacing={3}

        >

            {

                cards.map(card=>(


                    <Grid

                        item

                        xs={12}

                        sm={6}

                        md={4}

                        lg={2.4}

                        key={card.title}

                    >


                        <KPICard

                            {...card}

                        />


                    </Grid>


                ))

            }


        </Grid>

    );

}


export default KPIGrid;