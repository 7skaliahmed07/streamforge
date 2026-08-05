import {
    AppBar,
    Toolbar,
    Typography,
    Box
} from "@mui/material";


export default function Header(){

    return (

        <AppBar

            position="fixed"

            elevation={0}

            sx={{

                width:"calc(100% - 260px)",

                ml:"260px",

                background:"#ffffff",

                color:"#111827",

                borderBottom:
                "1px solid #e5e7eb",

                zIndex:(theme)=>theme.zIndex.drawer + 1

            }}

        >

            <Toolbar>


                <Typography

                    variant="h6"

                    fontWeight={700}

                >

                    Workspace

                </Typography>



                <Box

                    sx={{
                        flexGrow:1
                    }}

                />


                <Typography

                    variant="body2"

                    color="text.secondary"

                >

                    StreamForge v1.0

                </Typography>


            </Toolbar>


        </AppBar>

    );

}