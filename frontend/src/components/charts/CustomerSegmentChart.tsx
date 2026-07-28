import {
    Card,
    CardContent,
    Typography
} from "@mui/material";


import {

    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer

} from "recharts";



interface Props {

    data:any[];

}



// const COLORS = [

//     "#2563eb",
//     "#16a34a",
//     "#9333ea",
//     "#ea580c"

// ];

const COLORS = [
    "#2563eb", // Blue - Regular
    "#16a34a", // Green - Premium
    "#f59e0b", // Orange - New
    "#dc2626"  // Red
];



function CustomerSegmentChart({

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

                            nameKey="segment"

                            cx="50%"

                            cy="50%"

                            outerRadius={120}

                            label

                        >

                        {
                            data.map(
                                (entry,index)=>(

                                    <Cell

                                        key={
                                            `segment-${index}`
                                        }

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

                        <Tooltip />


                        <Legend />


                    </PieChart>


                </ResponsiveContainer>


            </CardContent>


        </Card>

    );

}


export default CustomerSegmentChart;