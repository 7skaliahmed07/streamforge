import {
    Card,
    CardContent,
    Typography
} from "@mui/material";


function StatCard({title,value,icon}) {


    return (

        <Card
            sx={{
                minWidth:220,
                boxShadow:3,
                borderRadius:3
            }}
        >

            <CardContent>


                <Typography
                    variant="subtitle2"
                    color="text.secondary"
                >
                    {icon} {title}
                </Typography>



                <Typography
                    variant="h3"
                    sx={{
                        mt:2,
                        fontWeight:"bold"
                    }}
                >
                    {value}
                </Typography>


            </CardContent>


        </Card>

    );

}


export default StatCard;