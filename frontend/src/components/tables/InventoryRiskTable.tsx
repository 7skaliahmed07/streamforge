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



function getStockStatus(quantity:number){

    if(quantity <= 20){

        return {
            label:"Critical",
            color:"error" as const
        };

    }


    if(quantity <= 100){

        return {
            label:"Low Stock",
            color:"warning" as const
        };

    }


    return {

        label:"Healthy",

        color:"success" as const

    };

}




function InventoryRiskTable({

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

                    Inventory Risk Monitor

                </Typography>



                <TableContainer

                    component={Paper}

                >

                    <Table>


                        <TableHead>

                            <TableRow>


                                <TableCell>
                                    Product
                                </TableCell>


                                <TableCell>
                                    Category
                                </TableCell>


                                <TableCell align="right">
                                    Stock
                                </TableCell>


                                <TableCell>
                                    Status
                                </TableCell>


                            </TableRow>


                        </TableHead>



                        <TableBody>


                            {
                                data.map(

                                    (item)=>(


                                    <TableRow

                                        key={item.name}

                                    >


                                        <TableCell>

                                            {item.name}

                                        </TableCell>



                                        <TableCell>

                                            {item.category}

                                        </TableCell>



                                        <TableCell align="right">

                                            {item.quantity}

                                        </TableCell>



                                        <TableCell>


                                            <Chip

                                                label={
                                                    getStockStatus(
                                                        item.quantity
                                                    ).label
                                                }

                                                color={
                                                    getStockStatus(
                                                        item.quantity
                                                    ).color
                                                }

                                                size="small"

                                            />


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


export default InventoryRiskTable;