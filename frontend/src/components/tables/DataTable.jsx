import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
} from "@mui/material";


function DataTable({columns, rows}) {


    return (

        <TableContainer component={Paper}>


            <Table>


                <TableHead>

                    <TableRow>

                        {
                            columns.map((column)=>(
                                <TableCell key={column}>
                                    {column}
                                </TableCell>
                            ))
                        }

                    </TableRow>

                </TableHead>


                <TableBody>


                    {
                        rows.map((row,index)=>(

                            <TableRow key={index}>

                                {
                                    columns.map((column)=>(

                                        <TableCell key={column}>
                                            {row[column]}
                                        </TableCell>

                                    ))
                                }

                            </TableRow>

                        ))
                    }


                </TableBody>


            </Table>


        </TableContainer>

    );

}


export default DataTable;