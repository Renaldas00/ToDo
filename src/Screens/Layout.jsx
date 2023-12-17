import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Box, List, ListItem, Container } from "@mui/material";

import Navigation from "../Components/UI/Navigation/navigation";
import AuthForm from "./Authentification/Authentication";
import ToDoPage from "../Screens/ToDo/ToDo";

export default function Layout() {
    const navigate = useNavigate();

    useEffect(() => {
        const userName = localStorage.getItem("userName");
        const uuid = localStorage.getItem("uuid");

        if (!userName || !uuid) {
            navigate("/login");
        }
    }, [navigate]);

    return (
        <Box>
            <List>
                <ListItem button key="Navigation">
                    <Navigation />
                </ListItem>
            </List>
            <Container sx={{ mt: 10 }}>
                <Routes>
                    <Route path="/login" element={<AuthForm />} />
                    <Route path="/" element={<ToDoPage />} />
                </Routes>
            </Container>
        </Box>
    );
}
