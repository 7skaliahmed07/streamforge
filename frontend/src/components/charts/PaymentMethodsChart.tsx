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
    data: any[];
}


const COLORS = [
    "#2563eb",
    "#16a34a",
    "#9333ea",
    "#ea580c"
];


function PaymentMethodsChart({
    data
}: Props) {


    return (

        <Card
            sx={{
                borderRadius: 3,
                mt:4,
                overflow:"hidden"
            }}
        >

            <CardContent>


                <Typography

                    variant="h6"

                    fontWeight={700}

                    mb={3}

                >

                    Payment Methods Revenue

                </Typography>



                <ResponsiveContainer

                    width="100%"

                    height={350}

                >

                    <PieChart>


                        <Pie

                            data={data}

                            dataKey="revenue"

                            nameKey="paymentMethod"

                            cx="50%"

                            cy="50%"

                            innerRadius={75}

                            outerRadius={120}

                            paddingAngle={4}

                            label

                        >

                            {
                                data.map(
                                    (entry,index)=>(

                                        <Cell

                                            key={
                                                `cell-${index}`
                                            }

                                            fill={
                                                COLORS[index % COLORS.length]
                                            }

                                        />

                                    )
                                )
                            }


                        </Pie>



                        <Tooltip

                            formatter={
                                (value:any)=>

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


                        <Legend />


                    </PieChart>


                </ResponsiveContainer>


            </CardContent>


        </Card>

    );

}


export default PaymentMethodsChart;