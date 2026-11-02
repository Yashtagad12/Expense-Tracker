import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        mode: "light",

        primary: {
        main: "#5267DE",
        dark: "#3D4FB3",
        light: "#EEF0FF",
            contrastText: "#FFFFFF",
        },

        secondary: {
            main: "#16845B",
            dark: "#106B49",
            light: "#E3F5EC",
            contrastText: "#FFFFFF",
        },

        background: {
            default: "#F6F7FB",
            paper: "#FFFFFF",
        },

        text: {
            primary: "#172B24",
            secondary: "#718078",
        },

        success: {
            main: "#16845B",
        },

        error: {
            main: "#D1435B",
        },

        divider: "#E7ECE9",
    },

    typography: {
        fontFamily: '"Inter", "Roboto", "Arial", sans-serif',

        h4: {
            fontWeight: 700,
            letterSpacing: "-0.8px",
        },

        h5: {
            fontWeight: 700,
            letterSpacing: "-0.5px",
        },

        h6: {
            fontWeight: 600,
        },

        button: {
            textTransform: "none",
            fontWeight: 600,
        },
    },

    shape: {
        borderRadius: 12,
    },

    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    border: "1px solid #E7ECE9",
                    boxShadow: "0 2px 12px rgba(23, 43, 36, 0.03)",
                },
            },
        },

        MuiButton: {
            defaultProps: {
                disableElevation: true,
            },
        },
    },
});

export default theme;