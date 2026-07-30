import {
    Card,
    CardContent,
    Typography,
    Box
} from "@mui/material";


interface KPICardProps {

    title:string;

    value:string;

    icon:React.ReactNode;

    color:string;

}



export default function KPICard({

    title,

    value,

    icon,

    color

}:KPICardProps){


    return (

        <Card

        sx={{

            borderRadius:4,

            height:"100%",

            background:
            `linear-gradient(
                135deg,
                ${color}22,
                white
            )`,

            boxShadow:
            "0 10px 30px rgba(0,0,0,0.08)",

            transition:"0.3s",

            "&:hover":{

                transform:"translateY(-5px)",

                boxShadow:
                "0 15px 35px rgba(0,0,0,0.12)"

            }

        }}

        >

        <CardContent>


        <Box

        sx={{

            width:60,

            height:60,

            borderRadius:3,

            display:"flex",

            alignItems:"center",

            justifyContent:"center",

            background:color,

            color:"#fff",

            mb:2

        }}

        >

            {icon}

        </Box>




        <Typography

        color="text.secondary"

        fontWeight={600}

        >

            {title}

        </Typography>



        <Typography

        variant="h4"

        fontWeight={800}

        mt={1}

        >

            {value}

        </Typography>



        </CardContent>


        </Card>


    );


}