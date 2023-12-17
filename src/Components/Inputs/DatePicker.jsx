import { useState, useEffect } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import dayjs from "dayjs";
export default function DatePicker({ label, setSelectedDate, sx, id, required, defaultValue }) {
    const [selectedDateTime, setSelectedDateTime] = useState(null);

    useEffect(() => {
        if (setSelectedDate) {
            setSelectedDate(selectedDateTime);
        }
    }, [selectedDateTime, setSelectedDate]);

    function handleClearDateTime() {
        setSelectedDateTime(null);
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box
                sx={{
                    ...sx,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 1,
                }}
            >
                <DateTimePicker
                    id={id}
                    sx={{ flex: 1 }}
                    minDateTime={dayjs()}
                    onChange={setSelectedDateTime}
                    value={selectedDateTime ? selectedDateTime : defaultValue ? dayjs(defaultValue) : null}
                    format="YYYY-MM-DD"
                    label={label}
                    slotProps={{
                        textField: {
                            required: Boolean(required),
                        },
                    }}
                />
                <IconButton onClick={handleClearDateTime}>
                    <ClearIcon />
                </IconButton>
            </Box>
        </LocalizationProvider>
    );
}
