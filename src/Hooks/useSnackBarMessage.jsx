import { useSnackbar } from "notistack";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useCallback } from "react";

export function useSnackbarMessage() {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const sendMessage = useCallback(
        (message, variant) => {
            enqueueSnackbar(message, {
                variant,
                action: (key) => (
                    <IconButton onClick={() => closeSnackbar(key)} size="small">
                        <CloseIcon sx={{ color: "#ffffff" }} />
                    </IconButton>
                ),
            });
        },
        [enqueueSnackbar, closeSnackbar]
    );

    return { sendMessage };
}
