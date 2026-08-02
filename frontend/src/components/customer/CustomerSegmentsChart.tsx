import {

Card,

CardContent,

Typography

}

from "@mui/material";

import {

PieChart,

Pie,

Cell,

ResponsiveContainer,

Tooltip

}

from "recharts";

const COLORS=[

"#2563eb",

"#16a34a",

"#ea580c"

];

export default function CustomerSegmentsChart({data}:any){

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

Customer Segments

</Typography>

<ResponsiveContainer

width="100%"

height={350}

>

<PieChart>

<Pie

data={data}

dataKey="customers"

nameKey="customer_segment"

outerRadius={110}

label

>

{

data.map((_:any,index:number)=>(

<Cell

key={index}

fill={COLORS[index%COLORS.length]}

/>

))

}

</Pie>

<Tooltip/>

</PieChart>

</ResponsiveContainer>

</CardContent>

</Card>

);

}