import {

    Card,

    CardContent,

    Typography

} from "@mui/material";


import {

    LineChart,

    Line,

    XAxis,

    YAxis,

    CartesianGrid,

    Tooltip,

    ResponsiveContainer

} from "recharts";



interface Props {

    data:any[];

}



function RevenueTrendChart({

    data

}:Props){


    return (

        <Card

            sx={{
                mt:4,
                borderRadius:3,
                overflow:"hidden"
            }}

        >

            <CardContent>


                <Typography

                    variant="h6"

                    fontWeight={700}

                    mb={3}

                >

                    Revenue Trend

                </Typography>



                <ResponsiveContainer

                    width="100%"

                    height={350}

                >


                    <LineChart

                        data={data}
                        margin={{
                        top:20,
                        right:30,
                        left:40,
                        bottom:20
    }}

                    >


                        <CartesianGrid

                            strokeDasharray="3 3"

                        />


                        <XAxis

                            dataKey="date"

                        />


                        <YAxis tickFormatter={(value)=>{

                        if(value >= 1000000){

                            return `€${(
                                value / 1000000
                            ).toFixed(0)}M`;

                        }

                        return `€${value}`;

                    }}/>


                        <Tooltip

                            formatter={(value:any)=>

                                new Intl.NumberFormat(
                                    "en-IE",
                                    {
                                        style:"currency",
                                        currency:"EUR"
                                    }
                                ).format(value)

                            }

                        />



                        <Line

                            type="monotone"

                            dataKey="revenue"

                            stroke="#2563eb"

                            strokeWidth={3}

                            dot={false}

                        />


                    </LineChart>


                </ResponsiveContainer>


            </CardContent>


        </Card>

    );

}


export default RevenueTrendChart;