import React from "react";
import { createRoot } from "react-dom/client";
import Layout from "./Screens/Layout.jsx";
import "./assets/index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { SnackbarProvider } from "notistack";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./Redux/reducers";
import thunk from "redux-thunk";

const store = configureStore({
    reducer: {
        main: dataReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

const theme = createTheme({
    palette: {
        primary: {
            main: "#004731",
        },
        secondary: {
            main: "#f50057",
        },
    },
    typography: {
        h4: {
            fontWeight: 500,
            fontSize: "1.5rem",
            letterSpacing: 0.5,
        },
        fontFamily: "Poppins",
    },
});
const rootElement = document.getElementById("root");
const app = (
    <React.StrictMode>
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <Router>
                    <SnackbarProvider maxSnack={3}>
                        <Layout />
                    </SnackbarProvider>
                </Router>
            </ThemeProvider>
        </Provider>
    </React.StrictMode>
);

createRoot(rootElement).render(app);
