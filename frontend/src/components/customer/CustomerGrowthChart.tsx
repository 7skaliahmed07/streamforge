import {
    Card,
    CardContent,
    Typography
} from "@mui/material";

import {
    ResponsiveContainer,
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip
} from "recharts";

interface Props{

    data:any[];

}

export default function CustomerGrowthChart({data}:Props){

    return(

        <Card
            sx={{
                borderRadius:4,
                boxShadow:"0 10px 30px rgba(0,0,0,0.08)"
            }}
        >

            <CardContent>

                <Typography
                    variant="h6"
                    fontWeight={700}
                    mb={3}
                >

                    Customer Growth

                </Typography>

                <ResponsiveContainer
                    width="100%"
                    height={350}
                >

                    <LineChart data={data}>

                        <CartesianGrid strokeDasharray="3 3"/>

                        <XAxis dataKey="month"/>

                        <YAxis/>

                        <Tooltip/>

                        <Line

                            type="monotone"

                            dataKey="customers"

                            stroke="#2563eb"

                            strokeWidth={3}

                            dot={{r:5}}

                        />

                    </LineChart>

                </ResponsiveContainer>

            </CardContent>

        </Card>

    );

}