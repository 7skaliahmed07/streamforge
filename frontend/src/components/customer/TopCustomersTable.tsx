import {
    Card,
    CardContent,
    Typography,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Chip,
    Avatar,
    Box
} from "@mui/material";

import { TrendingUp } from "@mui/icons-material";

interface Customer{

    first_name:string;

    last_name:string;

    city:string;

    customer_segment:string;

    orders:string;

    revenue:string;

}

interface Props{

    data:Customer[];

}

export default function TopCustomersTable({

    data

}:Props){

    const getSegmentColor=(segment:string)=>{

        switch(segment){

            case "Premium":

                return "success";

            case "Regular":

                return "primary";

            default:

                return "warning";

        }

    };



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

                    Top Customers

                </Typography>

                <Table>

                    <TableHead>

                        <TableRow>

                            <TableCell>

                                Customer

                            </TableCell>

                            <TableCell>

                                City

                            </TableCell>

                            <TableCell>

                                Segment

                            </TableCell>

                            <TableCell align="center">

                                Orders

                            </TableCell>

                            <TableCell align="right">

                                Revenue

                            </TableCell>

                        </TableRow>

                    </TableHead>

                    <TableBody>

                        {

                        data.map((customer,index)=>(

                            <TableRow

                                key={index}

                                hover

                                sx={{

                                    "&:last-child td":{

                                        borderBottom:0

                                    }

                                }}

                            >

                                <TableCell>

                                    <Box

                                    display="flex"

                                    alignItems="center"

                                    gap={2}

                                    >

                                        <Avatar

                                        sx={{

                                            bgcolor:"#2563eb",

                                            width:42,

                                            height:42,

                                            fontWeight:700

                                        }}

                                        >

                                            {

                                            customer.first_name[0]

                                            }

                                            {

                                            customer.last_name[0]

                                            }

                                        </Avatar>

                                        <Box>

                                            <Typography

                                                fontWeight={700}

                                            >

                                                {

                                                customer.first_name

                                                }

                                                {" "}

                                                {

                                                customer.last_name

                                                }

                                            </Typography>

                                        </Box>

                                    </Box>

                                </TableCell>

                                <TableCell>

                                    {

                                    customer.city

                                    }

                                </TableCell>

                                <TableCell>

                                    <Chip

                                        label={

                                            customer.customer_segment

                                        }

                                        color={

                                            getSegmentColor(

                                                customer.customer_segment

                                            ) as any

                                        }

                                        size="small"

                                    />

                                </TableCell>

                                <TableCell

                                    align="center"

                                >

                                    {

                                    Number(

                                        customer.orders

                                    ).toLocaleString()

                                    }

                                </TableCell>

                                <TableCell

                                    align="right"

                                >

                                    <Box

                                    display="flex"

                                    justifyContent="flex-end"

                                    alignItems="center"

                                    gap={1}

                                    >

                                        <TrendingUp

                                            sx={{

                                                color:"#16a34a",

                                                fontSize:18

                                            }}

                                        />

                                        <Typography

                                            fontWeight={700}

                                        >

                                            €

                                            {

                                            Number(

                                                customer.revenue

                                            ).toLocaleString(

                                                "en-US",

                                                {

                                                    minimumFractionDigits:2,

                                                    maximumFractionDigits:2

                                                }

                                            )

                                            }

                                        </Typography>

                                    </Box>

                                </TableCell>

                            </TableRow>

                        ))

                        }

                    </TableBody>

                </Table>

            </CardContent>

        </Card>

    );

}