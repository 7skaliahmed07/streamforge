import {
    Card,
    CardContent,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Chip
} from "@mui/material";


interface Props {

    data:any[];

}


function formatCurrency(value:number){

    return new Intl.NumberFormat(
        "en-IE",
        {
            style:"currency",
            currency:"EUR",
            maximumFractionDigits:0
        }
    ).format(value);

}



function TopProductsTable({

    data

}:Props){


    return (

        <Card

            sx={{

                mt:4,

                borderRadius:3

            }}

        >

            <CardContent>


                <Typography

                    variant="h6"

                    fontWeight={700}

                    mb={3}

                >

                    Top Products Performance

                </Typography>



                <TableContainer

                    component={Paper}

                >

                    <Table>


                        <TableHead>

                            <TableRow>


                                <TableCell>
                                    Rank
                                </TableCell>


                                <TableCell>
                                    Product
                                </TableCell>


                                <TableCell>
                                    Category
                                </TableCell>


                                <TableCell align="right">
                                    Units Sold
                                </TableCell>


                                <TableCell align="right">
                                    Revenue
                                </TableCell>


                            </TableRow>

                        </TableHead>



                        <TableBody>


                            {
                                data.map(
                                    (
                                        product,
                                        index
                                    )=>(


                                    <TableRow

                                        key={
                                            product.name
                                        }

                                    >


                                        <TableCell>

                                            {
                                                index + 1
                                            }

                                        </TableCell>



                                        <TableCell>

                                            {
                                                product.name
                                            }

                                        </TableCell>



                                        <TableCell>


                                            <Chip

                                                label={
                                                    product.category
                                                }

                                                size="small"

                                            />


                                        </TableCell>



                                        <TableCell align="right">

                                            {
                                                product.unitsSold
                                            }

                                        </TableCell>



                                        <TableCell align="right">

                                            {
                                                formatCurrency(
                                                    product.revenue
                                                )
                                            }

                                        </TableCell>


                                    </TableRow>


                                ))

                            }


                        </TableBody>


                    </Table>


                </TableContainer>


            </CardContent>


        </Card>

    );

}


export default TopProductsTable;