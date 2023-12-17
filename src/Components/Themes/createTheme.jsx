import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: "#004731",
        },
        secondary: {
            main: "#004731",
        },
    },
    typography: {
        h1: {
            textAlign: "center",
            color: "#004731",
            fontFamily: "Poppins",
        },
    },
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    margin: "10px 0",
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    "&:hover fieldset": {
                        borderColor: "#004731",
                    },
                    "&.Mui-focused fieldset": {
                        borderColor: "#004731",
                    },
                },
            },
        },
    },
});

const fullWidth = { m: 1, width: "100%" };
const halfWidth = { m: 1, width: { xs: "100%", md: "45%" } };

export { theme, fullWidth, halfWidth };
