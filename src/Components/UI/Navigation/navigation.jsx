import { Link } from "react-router-dom";
import logo from "../../../assets/ca.png";
import { AppBar, Box, CssBaseline, Avatar, Toolbar, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useAuthentication } from "../../../Hooks/useAuthentication";

export default function DrawerAppBar() {
    const { handleLogout } = useAuthentication();

    const userName = localStorage.getItem("userName");
    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AppBar component="nav">
                <Toolbar>
                    <Avatar
                        alt="Logo"
                        src={logo}
                        component={Link}
                        to="/"
                        sx={{
                            display: {
                                xs: "none",
                                sm: "block",
                                width: 200,
                                height: 50,
                            },
                            marginRight: "1rem",
                        }}
                    />
                    <Box sx={{ flexGrow: 1 }} />
                    {userName && (
                        <>
                            <Typography variant="subtitle1" sx={{ marginRight: "1rem" }}>
                                {userName}
                            </Typography>
                            <Typography marginRight={1}>|</Typography>
                            <LoadingButton color="inherit" onClick={handleLogout}>
                                Logout
                            </LoadingButton>
                        </>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
}
