import {
    Card,
    CardContent,
    Typography
} from "@mui/material";


import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";


interface Props {

    data:any[];

}


function CitySalesChart({

    data

}:Props){


    return (

        <Card

            sx={{

                borderRadius:3,

                mt:4

            }}

        >

            <CardContent>


                <Typography

                    variant="h6"

                    fontWeight={700}

                    mb={3}

                >

                    Revenue by City

                </Typography>



                <ResponsiveContainer

                    width="100%"

                    height={350}

                >

                    <BarChart

                        data={data}

                        layout="vertical"

                        margin={{
                            top:20,
                            right:30,
                            left:80,
                            bottom:20
                        }}

                    >

                        <CartesianGrid

                            strokeDasharray="3 3"

                        />


                        <XAxis

                            type="number"

                            tickFormatter={(value)=>{

                                if(value >= 1000000){

                                    return `€${(
                                        value/1000000
                                    ).toFixed(0)}M`;

                                }

                                return value;

                            }}

                        />


                        <YAxis

                            dataKey="city"

                            type="category"

                        />


                        <Tooltip

                            formatter={(value:any)=>

                                new Intl.NumberFormat(
                                    "en-IE",
                                    {
                                        style:"currency",
                                        currency:"EUR",
                                        maximumFractionDigits:0
                                    }
                                ).format(value)

                            }

                        />



                        <Bar

                            dataKey="revenue"

                            fill="#2563eb"

                            radius={[0,8,8,0]}

                        />


                    </BarChart>


                </ResponsiveContainer>


            </CardContent>


        </Card>

    );

}


export default CitySalesChart;