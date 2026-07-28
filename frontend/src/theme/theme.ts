import { createTheme } from "@mui/material/styles";

const theme = createTheme({

    palette: {

        mode: "light",

        primary: {

            main: "#2563eb"

        },

        secondary: {

            main: "#14b8a6"

        },

        background: {

            default: "#f6f8fb",

            paper: "#ffffff"

        }

    },

    typography: {

        fontFamily: [
            "Inter",
            "Roboto",
            "Helvetica",
            "Arial",
            "sans-serif"
        ].join(","),

        h3: {

            fontWeight: 700

        }

    },

    shape: {

        borderRadius: 12

    }

});

export default theme;