import {
    Box,
    Typography,
    Grid,
    Card,
    CardContent
} from "@mui/material";


import {
    Euro,
    ShoppingCart,
    TrendingUp,
    People
} from "@mui/icons-material";


import {
    LineChart,
    Line,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";


import {

    useSalesKPIs,

    useMonthlySales,

    useTopRevenueDays

}
from "../hooks/useAnalytics";


import KPICard

from "../components/dashboard/KPICard";




function SalesAnalytics(){



    const {

        data:kpis,

        isLoading:kpiLoading

    }

    =
    useSalesKPIs();





    const {

        data:monthlySales=[]

    }

    =
    useMonthlySales();





    const {

        data:topDays=[]

    }

    =
    useTopRevenueDays();







    const formattedMonthlySales =

    monthlySales.map(item=>({

        ...item,

        revenue:Number(item.revenue),

        orders:Number(item.orders)

    }));







    if(kpiLoading || !kpis){


        return (

            <Typography>

                Loading Sales Analytics...

            </Typography>

        );

    }







    const chartCardStyle={


        borderRadius:4,


        mb:4,


        boxShadow:

        "0 10px 30px rgba(0,0,0,0.08)"

    };









    return (


    <Box>




        <Typography

            variant="h4"

            fontWeight={800}

            mb={1}

        >

            Sales Analytics


        </Typography>




        <Typography

            color="text.secondary"

            mb={4}

        >

            Revenue, orders and customer performance overview


        </Typography>








        {/* KPI CARDS */}



        <Grid

        container

        spacing={3}

        mb={4}

        >




        <Grid item xs={12} md={3}>


            <KPICard


                title="Total Revenue"


                value={

                    `€${Number(

                    kpis.total_revenue

                    ).toLocaleString()}`

                }


                icon={<Euro fontSize="large"/>}


                color="#16a34a"


            />


        </Grid>







        <Grid item xs={12} md={3}>


            <KPICard


                title="Total Orders"


                value={

                    Number(

                    kpis.total_orders

                    ).toLocaleString()

                }


                icon={
                    <ShoppingCart 
                    fontSize="large"/>
                }


                color="#2563eb"


            />


        </Grid>








        <Grid item xs={12} md={3}>


            <KPICard


                title="Average Order Value"


                value={

                    `€${Number(

                    kpis.average_order_value

                    ).toFixed(2)}`

                }


                icon={
                    <TrendingUp
                    fontSize="large"/>
                }


                color="#9333ea"


            />


        </Grid>








        <Grid item xs={12} md={3}>


            <KPICard


                title="Customers"


                value={

                    Number(

                    kpis.unique_customers

                    ).toLocaleString()

                }


                icon={
                    <People
                    fontSize="large"/>
                }


                color="#ea580c"


            />


        </Grid>





        </Grid>









        {/* MONTHLY REVENUE */}





        <Card

        sx={chartCardStyle}

        >


        <CardContent>




        <Typography

        variant="h6"

        fontWeight={700}

        mb={3}

        >

            Monthly Revenue Trend


        </Typography>





        <ResponsiveContainer

        width="100%"

        height={350}

        >



        <LineChart

        data={formattedMonthlySales}

        >




        <CartesianGrid

        strokeDasharray="3 3"

        opacity={0.3}

        />




        <XAxis

        dataKey="month"

        />





        <YAxis

        tickFormatter={

            value=>

            `€${(

            value/1000000

            ).toFixed(1)}M`

        }

        />





        <Tooltip

        formatter={

            (value:any)=>

            `€${Number(value)

            .toLocaleString()}`

        }

        />







        <Line


        type="monotone"


        dataKey="revenue"


        stroke="#16a34a"


        strokeWidth={3}


        dot={{

            r:5

        }}


        activeDot={{

            r:8

        }}



        />





        </LineChart>





        </ResponsiveContainer>




        </CardContent>


        </Card>









        {/* MONTHLY ORDERS */}





        <Card

        sx={chartCardStyle}

        >


        <CardContent>




        <Typography

        variant="h6"

        fontWeight={700}

        mb={3}

        >

            Monthly Orders


        </Typography>






        <ResponsiveContainer

        width="100%"

        height={350}

        >




        <BarChart

        data={formattedMonthlySales}

        >





        <CartesianGrid

        strokeDasharray="3 3"

        opacity={0.3}

        />





        <XAxis

        dataKey="month"

        />





        <YAxis />





        <Tooltip />






        <Bar

        dataKey="orders"

        fill="#2563eb"

        radius={[8,8,0,0]}

        />





        </BarChart>






        </ResponsiveContainer>





        </CardContent>



        </Card>









        {/* TOP REVENUE DAYS */}





        <Card

        sx={chartCardStyle}

        >



        <CardContent>




        <Typography

        variant="h6"

        fontWeight={700}

        mb={3}

        >

            Top Revenue Days


        </Typography>







        {

        topDays.map(

            (

                day:{
                    day:string;
                    revenue:string;
                },

                index:number

            )=>(



            <Box

            key={index}

            display="flex"

            justifyContent="space-between"

            mb={2}

            >




            <Typography>

            {

            new Date(

                day.day

            )

            .toLocaleDateString()

            }


            </Typography>





            <Typography

            fontWeight={700}

            >


            €{

            Number(

            day.revenue

            )

            .toLocaleString()

            }





            </Typography>





            </Box>



            )

        )

        }







        </CardContent>


        </Card>






    </Box>



    );


}





export default SalesAnalytics;