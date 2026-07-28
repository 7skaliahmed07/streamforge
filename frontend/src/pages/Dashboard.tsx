import {

    Typography,

    Paper

} from "@mui/material";


function Dashboard(){


    return (

        <>

            <Typography

                variant="h4"

                fontWeight={700}

                mb={3}

            >

                Retail Overview

            </Typography>


            <Paper

                sx={{

                    p:5,

                    borderRadius:3

                }}

            >

                Dashboard analytics coming next 🚀


            </Paper>


        </>

    );

}


export default Dashboard;