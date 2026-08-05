import {

    Box,

    Card,

    CardContent,

    Typography,

    Chip

} from "@mui/material";


import {

    ResponsiveContainer,

    PieChart,

    Pie,

    Cell,

    Tooltip,

    Legend,

    BarChart,

    Bar,

    XAxis,

    YAxis,

    CartesianGrid

} from "recharts";




import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";

import EuroRoundedIcon from "@mui/icons-material/EuroRounded";

import WarehouseRoundedIcon from "@mui/icons-material/WarehouseRounded";

import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";


import DashboardLayout from "../layouts/DashboardLayout";


import DataTable from "../components/tables/DataTable";


import {

    useInventoryKPIs,

    useInventoryStatus,

    useInventoryCategory,

    useInventoryLowStock,
    useInventoryStockStatus

} from "../hooks/useAnalytics";





function InventoryAnalytics(){



const {

    data:kpis={}

}=useInventoryKPIs();


const {
    data:stockStatus=[]
}=useInventoryStockStatus();


console.log(
    "REAL STOCK STATUS:",
    stockStatus
);


const {

    data:categoryStock=[]

}=useInventoryCategory();



const {

    data:lowStock=[]

}=useInventoryLowStock();





const COLORS=[

"#2563EB",

"#22C55E",

"#F97316"

];





const statusData=

stockStatus.map((item:any)=>({

    ...item,

    products:Number(item.products)

}));





const categoryData=

categoryStock.map((item:any)=>({

    ...item,

    quantity:Number(item.quantity)

}));





const cardStyle={

    borderRadius:4,

    boxShadow:

    "0 10px 30px rgba(0,0,0,.08)"

};







const cards=[


{

title:"Total Products",

value:Number(
kpis.total_products
).toLocaleString(),

icon:<Inventory2RoundedIcon/>

},


{

title:"Total Stock",

value:Number(
kpis.total_stock
).toLocaleString(),

icon:<WarehouseRoundedIcon/>

},


{

title:"Inventory Value",

value:

`€${Number(
kpis.inventory_value
).toLocaleString(undefined,{
minimumFractionDigits:2,
maximumFractionDigits:2
})}`,

icon:<EuroRoundedIcon/>

},


{

title:"Average Stock",

value:Number(
kpis.average_stock
).toFixed(0),

icon:<TrendingUpRoundedIcon/>

}


];

const stockStatusData = stockStatus.map(
    (item:any)=>({

        name:item.status,

        value:Number(item.products)

    })
);


        console.log(`==>> stockStatusData: ${JSON.stringify(stockStatusData)}`)



return(


        // <DashboardLayout>



        <Box>



        <Typography

        variant="h4"

        fontWeight={800}

        mb={4}

        >

        Inventory Analytics

        </Typography>






        <Box

        display="grid"

        gridTemplateColumns={{

        xs:"1fr",

        lg:"repeat(4,1fr)"

        }}

        gap={3}

        mb={4}

        >



        {

        cards.map(card=>(


        <Card

        key={card.title}

        sx={cardStyle}

        >


        <CardContent>


        <Box

        display="flex"

        justifyContent="space-between"

        alignItems="center"

        >


        <Typography

        fontWeight={700}

        color="text.secondary"

        >

        {card.title}

        </Typography>


        <Box

        sx={{

        background:"#EEF2FF",

        padding:1.2,

        borderRadius:"50%"

        }}

        >

        {card.icon}

        </Box>


        </Box>



        <Typography

        variant="h4"

        fontWeight={800}

        mt={2}

        >

        {card.value}

        </Typography>



        </CardContent>


        </Card>


        ))


        }



        </Box>







        <Box

        display="grid"

        gridTemplateColumns={{

        xs:"1fr",

        lg:"1fr 1fr"

        }}

        gap={3}

        mb={4}

        >



        <Card sx={cardStyle}>

        <CardContent>


        <Typography

        variant="h6"

        fontWeight={700}

        mb={3}

        >

        Stock Status

        </Typography>



        <ResponsiveContainer

        width="100%"

        height={330}

        >


        <PieChart>


        <Pie

        data={stockStatusData}
        dataKey="value"
        nameKey="name"
        outerRadius={100}
        label={({name, value}) =>
            `${name}: ${value}`
        }

        >


        {

        statusData.map(

        (_:any,index:number)=>(


        <Cell

        key={index}

        fill={COLORS[index%COLORS.length]}

        />


        )

        )

        }



        </Pie>


        <Tooltip/>


        <Legend/>


        </PieChart>


        </ResponsiveContainer>


        </CardContent>


        </Card>








        <Card sx={cardStyle}>

        <CardContent>


        <Typography

        variant="h6"

        fontWeight={700}

        mb={3}

        >

        Stock By Category

        </Typography>



        <ResponsiveContainer

        width="100%"

        height={330}

        >


        <BarChart

        data={categoryData}

        >


        <CartesianGrid

        strokeDasharray="3 3"

        />


        <XAxis

        dataKey="category"

        />


        <YAxis/>


        <Tooltip/>


        <Bar

        dataKey="quantity"

        fill="#2563EB"

        radius={[8,8,0,0]}

        />



        </BarChart>



        </ResponsiveContainer>



        </CardContent>


        </Card>



        </Box>







        <Box mt={4}>


        <Card sx={cardStyle}>


        <CardContent>


        <Typography

        variant="h6"

        fontWeight={700}

        mb={3}

        >

        Low Stock Products

        </Typography>



        <DataTable


        columns={[

        "name",

        "brand",

        "quantity"

        ]}


        rows={

        lowStock.map((item:any)=>(

        {

        ...item,

        quantity:

        <Chip

        label={item.quantity}

        color={
        Number(item.quantity)<=2
        ?"error"
        :"warning"
        }

        />

        }

        ))

        }



        />



        </CardContent>


        </Card>


        </Box>





        </Box>



        // </DashboardLayout>


);



}



export default InventoryAnalytics;