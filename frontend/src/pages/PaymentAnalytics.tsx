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
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis
} from "recharts";



import PaymentsRoundedIcon from "@mui/icons-material/PaymentsRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import EuroRoundedIcon from "@mui/icons-material/EuroRounded";
import { useMonthlyPaymentRevenue, usePaymentKPIs, usePaymentMethods, usePaymentStatus }
 from "../hooks/usePaymentAnalytics";



const COLORS = [

    "#3730A3",
    "#0E7490",
    "#047857",
    "#B45309",
    "#B91C1C",
    "#6D28D9"

];



function KPICard({

    title,
    value,
    icon

}:any){


return (

<Card

sx={{

height:150,

borderRadius:"20px",

background:
"linear-gradient(135deg,#ffffff,#f8fafc)",


boxShadow:
"0 10px 30px rgba(0,0,0,0.08)",


transition:"0.3s",


"&:hover":{

transform:"translateY(-5px)",

boxShadow:
"0 15px 40px rgba(0,0,0,0.15)"

}

}}

>


<CardContent>


<Box

sx={{

display:"flex",

justifyContent:"space-between",

alignItems:"center"

}}

>


<Box>


<Typography

fontWeight="600"

color="text.secondary"

>

{title}

</Typography>



<Typography

variant="h4"

fontWeight="800"

mt={1}

>

{value}

</Typography>


</Box>



<Box

sx={{

fontSize:55,

display:"flex",

alignItems:"center",

filter:
"drop-shadow(0 4px 8px rgba(0,0,0,0.2))"

}}

>

{icon}

</Box>



</Box>


</CardContent>


</Card>

);

}





function PaymentAnalytics(){

const {
    data:kpis
}=usePaymentKPIs();


const {
    data:paymentMethods=[]
}=usePaymentMethods();


const {
    data:paymentStatus=[]
}=usePaymentStatus();


const {
    data:monthlyRevenue=[]
}=useMonthlyPaymentRevenue();

const methodData = Array.isArray(paymentMethods)
?
paymentMethods.map((item:any)=>({

    name: String(item.payment_method),

    value: Number(item.payments) || 0

}))
:
[];





const statusData = paymentStatus.map(
(item:any)=>({

name:item.payment_status,

value:Number(item.payments)

})

);





const revenueData = monthlyRevenue.map(
(item:any)=>({

month:item.month,

revenue:Number(item.revenue)

})

);





const cardStyle={


borderRadius:"20px",

background:"#ffffff",

boxShadow:
"0 10px 30px rgba(0,0,0,0.08)"

};

console.log(
    "PAYMENT METHOD CHART DATA",
    methodData
);


    return (

            <Box
            sx={{
                width:"100%",
                maxWidth:"100%",
                overflow:"hidden"
            }}
        >


            <Typography

            variant="h4"

            fontWeight="700"

            mb={3}

            >

            Payment Analytics

            </Typography>





            {/* KPI SECTION */}

            <Grid

            container

            spacing={3}

            mb={3}

            >


            <Grid item xs={12} md={3}>

            <KPICard

            title="Total Payments"

            value={
            Number(
            kpis?.total_payments || 0
            ).toLocaleString()
            }

            icon={

            <PaymentsRoundedIcon

            sx={{

            fontSize:55,

            color:"#2563EB"

            }}

            />

            }

            />

            </Grid>




            <Grid item xs={12} md={3}>

            <KPICard

            title="Successful Payments"

            value={
            Number(
            kpis?.successful_payments || 0
            ).toLocaleString()
            }

            icon={

            <CheckCircleRoundedIcon

            sx={{

            fontSize:55,

            color:"#16A34A"

            }}

            />

            }

            />

            </Grid>





            <Grid item xs={12} md={3}>

            <KPICard

            title="Failed Payments"

            value={
            Number(
            kpis?.failed_payments || 0
            ).toLocaleString()
            }

            icon={

            <CancelRoundedIcon

            sx={{

            fontSize:55,

            color:"#DC2626"

            }}

            />

            }

            />

            </Grid>





            <Grid item xs={12} md={3}>

            <KPICard

            title="Revenue"

            value={
            "€ "+
            Number(
            kpis?.total_revenue || 0
            ).toLocaleString()
            }

            icon={

            <EuroRoundedIcon

            sx={{

            fontSize:55,

            color:"#D97706"

            }}

            />

            }

            />

            </Grid>


            </Grid>







            {/* PAYMENT METHODS */}


            <Grid container spacing={3} mb={3}>

                <Grid
                    item
                    xs={12}
                    sx={{
                        width:"100%"
                    }}
                >
                <Card
                    sx={{
                        ...cardStyle,
                        width:"100%"
                    }}
                >

            <CardContent>


            <Typography

            variant="h6"

            fontWeight="700"

            mb={2}

            >

            Payment Methods

            </Typography>



            <ResponsiveContainer

            width="100%"

            height={420}

            >


            <PieChart>


            <Pie

            data={methodData}

            dataKey="value"

            nameKey="name"

            outerRadius={150}

            label={({name,value}) =>
                `${name}: ${value}`
            }

            labelLine={true}

            >


            {
            methodData.map(
            (_:any,index:number)=>(

            <Cell

            key={index}

            fill={
            COLORS[
            index % COLORS.length
            ]
            }

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


            </Grid>

            </Grid>









            {/* STATUS */}


            <Grid container spacing={3} mb={3}>


            <Grid
                item
                xs={12}
                sx={{
                    width:"100%"
                }}
            >
            <Card
                sx={{
                    ...cardStyle,
                    width:"100%"
                }}
            >

            <CardContent>


            <Typography

            variant="h6"

            fontWeight="700"

            mb={2}

            >

            Payment Status

            </Typography>



            <ResponsiveContainer

            width="100%"

            height={420}

            >


            <PieChart>


            <Pie

            data={statusData}

            dataKey="value"

            nameKey="name"

            outerRadius={150}

            label={(entry:any)=>
            `${entry.name}: ${entry.value}`
            }

            >


            {
            statusData.map(
            (_:any,index:number)=>(

            <Cell

            key={index}

            fill={
            COLORS[
            index % COLORS.length
            ]
            }

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


            </Grid>


            </Grid>









            {/* REVENUE TREND */}


            <Grid container spacing={3}>


            <Grid
                item
                xs={12}
                sx={{
                    width:"100%"
                }}
            >
            <Card
                sx={{
                    ...cardStyle,
                    width:"100%"
                }}
            >


            <CardContent>


            <Typography

            variant="h6"

            fontWeight="700"

            mb={2}

            >

            Monthly Revenue Trend

            </Typography>



            <ResponsiveContainer

            width="100%"

            height={450}

            >


            <LineChart

            data={revenueData}
            margin={{
                top: 30,
                right: 30,
                left: 30,
                bottom: 20
            }}

            >


            <CartesianGrid

            strokeDasharray="3 3"

            />


            <XAxis

            dataKey="month"

            />


            <YAxis/>

            <Tooltip/>


            <Legend/>




            <Line

            type="monotone"

            dataKey="revenue"

            stroke="#3730A3"

            strokeWidth={3}

            />


            </LineChart>


            </ResponsiveContainer>



            </CardContent>


            </Card>


            </Grid>


            </Grid>





            </Box>


            );


    }



export default PaymentAnalytics;