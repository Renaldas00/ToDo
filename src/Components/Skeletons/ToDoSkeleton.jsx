import * as React from "react";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import { fullWidth } from "../Themes/createTheme";
export default function ToDoSkeleton() {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                boxSizing: "border-box",
                alignItems: "center",
            }}
        >
            <Skeleton variant="rounded" sx={fullWidth} height={46} />
            <Skeleton variant="rounded" sx={fullWidth} height={46} />
            <Skeleton variant="rounded" sx={fullWidth} height={46} />
            <Skeleton variant="rounded" sx={fullWidth} height={46} />
            <Skeleton variant="rounded" sx={fullWidth} height={46} />
        </Box>
    );
}
