import { styled } from "@mui/material/styles";
import { LoadingButton } from "@mui/lab";
import Button from "@mui/material/Button";

const ColorButtonSubmit = styled(LoadingButton)(({ theme }) => ({
    color: theme.palette.getContrastText("#004731"),
    borderColor: "#004731",
    color: "#004731",
    fontFamily: "Poppins",
    backgroundColor: "white",
    "&:hover": {
        backgroundColor: "#004731",
        color: "white",
        borderColor: "#004731",
    },
}));
const ColorButtonCancel = styled(LoadingButton)(({ theme }) => ({
    color: theme.palette.getContrastText("#004731"),
    borderColor: "#d32d2e",
    color: "#d32d2e",
    fontFamily: "Poppins",
    backgroundColor: "white",
    "&:hover": {
        backgroundColor: "#d32d2e",
        color: "white",
        borderColor: "#d32d2e",
    },
}));

const ColorButtonReset = styled(LoadingButton)(({ theme }) => ({
    color: theme.palette.getContrastText("#bfbfbf"),
    borderColor: "#bfbfbf",
    color: "#bfbfbf",
    fontFamily: "Poppins",
    backgroundColor: "white",
    "&:hover": {
        backgroundColor: "#bfbfbf",
        color: "white",
        borderColor: "#bfbfbf",
    },
}));

const ColorButtonRefresh = styled(LoadingButton)(({ theme }) => ({
    color: theme.palette.getContrastText("#bfbfbf"),
    borderColor: "#bfbfbf",
    color: "#bfbfbf",
    fontFamily: "Poppins",
    backgroundColor: "white",
    "&:hover": {
        backgroundColor: "#004731",
        color: "white",
        borderColor: "#004731",
    },
}));

const ColorButtonAdd = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText("#004731"),
    borderColor: "#004731",
    color: "#004731",
    fontFamily: "Poppins",
    backgroundColor: "white",
    "&:hover": {
        backgroundColor: "#004731",
        color: "white",
        borderColor: "#004731",
    },
    minHeight: 0,
    minWidth: 0,
    padding: 0,
    margin: 10,
    width: 30,
    height: 30,
}));

export { ColorButtonSubmit, ColorButtonReset, ColorButtonAdd, ColorButtonRefresh, ColorButtonCancel };
