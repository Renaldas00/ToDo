import * as React from "react";
import { Container, Paper, TextField, Typography } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import styled from "@mui/material/styles/styled";
import { useAuthentication } from "../../Hooks/useAuthentication";
import { Box } from "@mui/system";

const StyledPaper = styled(Paper)({
    padding: "16px",
    display: "flex",
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
});

const StyledContainer = styled(Container)({
    display: "flex",
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
});

const ColorButtonSubmit = styled(LoadingButton)(({ theme }) => ({
    marginTop: 10,
    color: theme.palette.getContrastText("#004731"),
    borderColor: "#004731",
    color: "#004731",
    backgroundColor: "white",
    transition: "background-color 0.3s, color 0.3s, border-color 0.3s",
    "&:hover": {
        backgroundColor: "#004731",
        color: "white",
        borderColor: "#004731",
    },
}));

export default function AuthForm() {
    const { refs, states, handleAuthentification, handleToggleForm } = useAuthentication();

    return (
        <Box component="form" key={states.formKey} onSubmit={(e) => handleAuthentification(e)}>
            <StyledContainer component="main" maxWidth="xs">
                <StyledPaper elevation={3}>
                    <Typography variant="h5">{states.isRegister ? "Register" : "Login"}</Typography>
                    <TextField inputRef={refs.userName} label="Username" variant="outlined" fullWidth margin="normal" required={true} />
                    {states.isRegister && (
                        <TextField required={states.isRegister ? true : false} label="Email" type="email" variant="outlined" fullWidth margin="normal" inputRef={refs.email} />
                    )}
                    <TextField inputRef={refs.password} required={true} label="Password" variant="outlined" fullWidth type="password" margin="normal" />
                    <ColorButtonSubmit loading={states.loading} type="submit" variant="contained" color="primary">
                        {states.isRegister ? "Register" : "Login"}
                    </ColorButtonSubmit>
                    <ColorButtonSubmit loading={states.loading} onClick={handleToggleForm} color="primary">
                        {states.isRegister ? "Switch to Login" : "Switch to Register"}
                    </ColorButtonSubmit>
                </StyledPaper>
            </StyledContainer>
        </Box>
    );
}
