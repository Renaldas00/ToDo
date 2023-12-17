import React, { useState } from "react";
import { FormControl, InputLabel, Select, MenuItem, Box } from "@mui/material";

export default function Dropdown({ sx, data, label, compRef, callback, id, required, defaultValue }) {
    const [selectedValue, setSelectedValue] = useState(defaultValue ? defaultValue : "");

    const handleChange = (event) => {
        if (callback) {
            callback(event.target.value);
        }
        setSelectedValue(event.target.value);
    };

    return (
        <FormControl sx={{ ...sx, opacity: data.length === 0 ? 1 : 1 }}>
            <InputLabel sx={{ background: "#fff", padding: "0 8px" }}>{required ? `${label} *` : label}</InputLabel>
            <Select
                required={Boolean(required)}
                id={id}
                value={selectedValue}
                onChange={handleChange}
                MenuProps={{
                    PaperProps: {
                        style: {
                            maxHeight: 500,
                            overflowY: "auto",
                        },
                    },
                }}
                inputRef={compRef}
            >
                {data.map(({ id, textEn, items }) => {
                    if (items) {
                        const title = (
                            <MenuItem
                                key={id}
                                sx={{
                                    borderBottom: "1px solid #ccc",
                                    background: "#fafafa",
                                    "&.Mui-disabled": {
                                        opacity: 1,
                                    },
                                }}
                                disabled
                            >
                                <Box sx={{ textAlign: "center", width: "100%" }}>{textEn}</Box>
                            </MenuItem>
                        );

                        const selectItems = items.map((item, index) => (
                            <MenuItem
                                sx={{
                                    background: "#fefdfa",
                                    borderBottom: index === items.length - 1 ? "1px solid #ccc" : "none",
                                }}
                                value={item.textEn}
                                key={item.id}
                            >
                                {item.textEn}
                            </MenuItem>
                        ));
                        return [title, ...selectItems];
                    }
                    return (
                        <MenuItem value={textEn} key={id}>
                            <Box>{textEn}</Box>
                        </MenuItem>
                    );
                })}
            </Select>
        </FormControl>
    );
}
