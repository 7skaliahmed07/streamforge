import {
    Box,
    Grid,
    Card,
    CardContent,
    Typography
} from "@mui/material";


import {

    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
    Legend,
    BarChart,
    Bar,
    CartesianGrid,
    XAxis,
    YAxis

} from "recharts";


import {

    useGeographicKPIs,
    useCustomersByCountry,
    useCustomersByCity,
    useRevenueByCity

} from "../hooks/useGeographicAnalytics";


import PublicRoundedIcon from "@mui/icons-material/PublicRounded";
import LocationCityRoundedIcon from "@mui/icons-material/LocationCityRounded";
import FlagRoundedIcon from "@mui/icons-material/FlagRounded";
import PlaceRoundedIcon from "@mui/icons-material/PlaceRounded";





const COLORS=[

    "#1D4ED8",
    "#059669",
    "#D97706",
    "#DC2626",
    "#7C3AED"

];





function GeographicAnalytics(){


const {

data:kpis={}

}=useGeographicKPIs();



const {

data:countries=[]

}=useCustomersByCountry();



const {

data:cities=[]

}=useCustomersByCity();



const {

data:revenues=[]

}=useRevenueByCity();





const cardStyle={

    borderRadius:4,

    boxShadow:
    "0 10px 30px rgba(0,0,0,.08)",

    height:"100%"

};





const countryData =
countries.map((item:any)=>({

    name:item.country,

    value:Number(item.customers)

}));




const cityData =
cities.map((item:any)=>({

    city:item.city,

    customers:Number(item.customers)

}));




const revenueData =
revenues.map((item:any)=>({

    city:item.city,

    revenue:Number(item.revenue)

}));





const kpiCards=[


{

title:"Total Countries",

value:
Number(
kpis.total_countries || 0
).toLocaleString(),

icon:<PublicRoundedIcon/>


},


{

title:"Total Cities",

value:
Number(
kpis.total_cities || 0
).toLocaleString(),

icon:<LocationCityRoundedIcon/>


},


{

title:"Top Country",

value:
kpis.top_country || "-",

icon:<FlagRoundedIcon/>


},


{

title:"Top City",

value:
kpis.top_city || "-",

icon:<PlaceRoundedIcon/>


}


];





return(


<Box>


<Typography

variant="h4"

fontWeight={800}

mb={4}

>

Geographic Analytics

</Typography>





{/* KPI CARDS */}

<Grid

container

spacing={3}

mb={4}

>


{

kpiCards.map((card)=>(


<Grid

item

xs={12}

sm={6}

lg={3}

key={card.title}

>


<Card

sx={cardStyle}

>


<CardContent>


<Box

display="flex"

justifyContent="space-between"

alignItems="center"

>


<Typography

fontWeight={600}

color="text.secondary"

>

{card.title}

</Typography>


<Box

sx={{

background:"#EEF2FF",

borderRadius:"50%",

p:1.2

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


</Grid>


))


}


</Grid>









{/* CHARTS */}

<Box

display="grid"

gridTemplateColumns={{

xs:"1fr",

lg:"1fr"

}}

gap={3}

>









{/* COUNTRY */}

<Card

sx={cardStyle}

>


<CardContent>


<Typography

variant="h6"

fontWeight={700}

mb={2}

>

Customers By Country

</Typography>



<Box

height={420}

>


<ResponsiveContainer

width="100%"

height="100%"

>


<PieChart>


<Pie

data={countryData}

dataKey="value"

nameKey="name"

outerRadius={140}

label={({name,value})=>

`${name}: ${value}`

}

>


{

countryData.map((_,index)=>(


<Cell

key={index}

fill={
COLORS[
index % COLORS.length
]
}

/>


))


}


</Pie>



<Tooltip/>

<Legend/>


</PieChart>


</ResponsiveContainer>


</Box>


</CardContent>


</Card>









{/* CITY */}

<Card

sx={cardStyle}

>


<CardContent>


<Typography

variant="h6"

fontWeight={700}

mb={2}

>

Top Cities By Customers

</Typography>




<Box

height={450}

>


<ResponsiveContainer

width="100%"

height="100%"

>


<BarChart

data={cityData}

layout="vertical"

margin={{

left:80,

right:30

}}

>


<CartesianGrid

strokeDasharray="3 3"

/>


<XAxis

type="number"

/>


<YAxis

type="category"

dataKey="city"

width={100}

/>


<Tooltip/>


<Bar

dataKey="customers"

fill="#2563EB"

radius={[0,8,8,0]}

/>


</BarChart>


</ResponsiveContainer>


</Box>


</CardContent>


</Card>









{/* REVENUE */}

<Card

sx={cardStyle}

>


<CardContent>


<Typography

variant="h6"

fontWeight={700}

mb={2}

>

Revenue By City

</Typography>




<Box

height={500}

>


<ResponsiveContainer

width="100%"

height="100%"

>


<BarChart

data={revenueData}

layout="vertical"

margin={{

left:80,

right:40

}}

>


<CartesianGrid

strokeDasharray="3 3"

/>


<XAxis

type="number"

tickFormatter={(value)=>

`€${(value/1000000).toFixed(1)}M`

}

/>


<YAxis

type="category"

dataKey="city"

width={100}

/>



<Tooltip

formatter={(value:any)=>[

`€ ${Number(value).toLocaleString()}`,

"Revenue"

]}


/>



<Bar

dataKey="revenue"

fill="#059669"

radius={[0,8,8,0]}

/>


</BarChart>


</ResponsiveContainer>


</Box>


</CardContent>


</Card>






</Box>


</Box>


);


}



export default GeographicAnalytics;