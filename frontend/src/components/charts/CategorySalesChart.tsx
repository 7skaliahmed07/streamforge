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



function CategorySalesChart({

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

                    Category Revenue

                </Typography>



                <ResponsiveContainer

                    width="100%"

                    height={350}

                >


                    <BarChart

                        data={data}
                        margin={{
                        top:20,
                        right:30,
                        left:40,
                        bottom:60
                    }}

                    >


                        <CartesianGrid

                            strokeDasharray="3 3"

                        />


                        <XAxis

                            dataKey="category"

                        />


                        <YAxis
                            tickFormatter={(value) => {
                                if (value >= 1000000) {
                                    return `€${(value / 1000000).toFixed(0)}M`;
                                }
                                return `€${value}`;
                            }}
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

                            fill="#16a34a"

                            radius={[8,8,0,0]}

                        />


                    </BarChart>


                </ResponsiveContainer>


            </CardContent>


        </Card>

    );

}


export default CategorySalesChart;