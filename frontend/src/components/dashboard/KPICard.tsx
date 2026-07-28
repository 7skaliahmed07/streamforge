import {
    Card,
    CardContent,
    Typography,
    Box
} from "@mui/material";


interface Props {

    title: string;

    value: string;

    icon: React.ReactNode;

    color?: string;

}



function KPICard({

    title,

    value,

    icon,

    color = "primary.main"

}: Props) {


    return (

        <Card

            sx={{

                height:"100%",

                borderRadius:3,

                boxShadow:
                    "0 4px 20px rgba(0,0,0,0.05)"

            }}

        >

            <CardContent>


                <Box

                    display="flex"

                    justifyContent="space-between"

                    alignItems="center"

                >


                    <Box>


                        <Typography

                            variant="body2"

                            color="text.secondary"

                        >

                            {title}

                        </Typography>



                        <Typography

                            variant="h4"

                            fontWeight={700}

                            mt={1}

                        >

                            {value}

                        </Typography>


                    </Box>



                    <Box

                        sx={{

                            backgroundColor:color,

                            color:"white",

                            width:55,

                            height:55,

                            borderRadius:"50%",

                            display:"flex",

                            alignItems:"center",

                            justifyContent:"center"

                        }}

                    >

                        {icon}


                    </Box>


                </Box>


            </CardContent>


        </Card>

    );

}


export default KPICard;