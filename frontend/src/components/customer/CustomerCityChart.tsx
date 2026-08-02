import {

Card,

CardContent,

Typography

}

from "@mui/material";

import {

ResponsiveContainer,

BarChart,

Bar,

XAxis,

YAxis,

CartesianGrid,

Tooltip

}

from "recharts";

export default function CustomerCityChart({data}:any){

return(

<Card sx={{

borderRadius:4,

boxShadow:"0 10px 30px rgba(0,0,0,0.08)"

}}>

<CardContent>

<Typography

variant="h6"

fontWeight={700}

mb={3}

>

Customers by City

</Typography>

<ResponsiveContainer

width="100%"

height={350}

>

<BarChart

layout="vertical"

data={data}

>

<CartesianGrid strokeDasharray="3 3"/>

<XAxis type="number"/>

<YAxis

type="category"

dataKey="city"

/>

<Tooltip/>

<Bar

dataKey="customers"

fill="#9333ea"

radius={[0,8,8,0]}

/>

</BarChart>

</ResponsiveContainer>

</CardContent>

</Card>

);

}