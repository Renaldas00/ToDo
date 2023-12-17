import React, { useEffect } from "react";
import { useData } from "../../Hooks/useData";
import { useTodo } from "../../Hooks/useTodo";
import { Box, Accordion, AccordionSummary, AccordionDetails, Typography, TextField, List, Divider } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import Dropdown from "../../Components/Inputs/Dropdown";
import DatePicker from "../../Components/Inputs/DatePicker";
import AddIcon from "@mui/icons-material/Add";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { RefreshOutlined } from "@mui/icons-material";
import ToDoSkeleton from "../../Components/Skeletons/ToDoSkeleton";
import { useSelector } from "react-redux";

const types = [
    { id: 1, textEn: "Work" },
    { id: 2, textEn: "Personal" },
    { id: 3, textEn: "Shopping" },
    { id: 4, textEn: "Health" },
];

export default function ToDoPage() {
    const { getItems } = useData();
    const { refs, states, handleActions, setSelectedType, handleExpand, setSelectedDateTime, handleToggleUpdate, setContent } = useTodo();

    useEffect(() => {
        getItems();
    }, []);

    const items = useSelector((state) => state.main.items);
    const loadingData = useSelector((state) => state.main.loadingData);

    return (
        <Box key={states.formKey}>
            <Accordion sx={{ boxShadow: 3 }}>
                <AccordionSummary expandIcon={<AddIcon />} onClick={handleExpand}>
                    <Typography variant="h4" sx={{ fontWeight: "bold", color: "text.secondary" }}>
                        Create a task
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Box component={"form"} onSubmit={(e) => handleActions(e, null, "add")} sx={{ width: "100%" }}>
                        <TextField required type="text" value={states.content} onChange={() => setContent(event.target.value)} label="Content" fullWidth sx={{ marginBottom: 2 }} />
                        <DatePicker setSelectedDate={setSelectedDateTime} error={false} required fullWidth sx={{ marginBottom: 2 }} id="dateEnd" label="End Date" />
                        <Dropdown
                            required
                            callback={setSelectedType}
                            data={types.map((item) => ({ id: item.id, textEn: item.textEn }))}
                            sx={{ marginBottom: 2, width: "100%" }}
                            label="Type"
                            id="type"
                            compRef={refs.type}
                        />
                        <Box sx={{ display: "flex", justifyContent: "right", marginTop: 2 }}>
                            <LoadingButton sx={{ width: "5%" }} loading={loadingData || states.loading} variant="contained" type="submit">
                                <AddIcon />
                            </LoadingButton>
                        </Box>
                    </Box>
                </AccordionDetails>
            </Accordion>
            <Box sx={{ display: "flex", width: "100%", padding: 2, boxShadow: 3, marginTop: 2 }}>
                <Box sx={{ width: "100%", textAlign: "center" }}>
                    <Typography variant="h4" fontWeight="bold" color="text.secondary">
                        Your Tasks
                    </Typography>
                </Box>
                <LoadingButton sx={{ ml: 2, width: "5%" }} loading={loadingData || states.loading} variant="contained" onClick={getItems}>
                    <RefreshOutlined />
                </LoadingButton>
            </Box>
            <Box display={"flex"} justifyContent={"right"}></Box>
            {!loadingData && items?.length === 0 && (
                <Box
                    sx={{
                        mt: 5,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "100%",
                    }}
                >
                    <Typography variant="h2" sx={{ fontWeight: "bold", mb: 2, textAlign: "center", color: "text.secondary" }}>
                        You don't have any tasks
                    </Typography>
                    <Typography variant="body1" sx={{ textAlign: "center", color: "text.secondary" }}>
                        Start by adding some tasks to your to-do list.
                    </Typography>
                </Box>
            )}
            {loadingData && items?.length === 0 ? (
                <ToDoSkeleton />
            ) : (
                <List>
                    {items?.map((task) => (
                        <Accordion key={task.id}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography color={"text.secondary"} fontWeight={"bold"}>
                                    {task.type}
                                </Typography>
                                <Box sx={{ marginLeft: "auto" }}>
                                    <LoadingButton
                                        sx={{ p: 1, m: 0 }}
                                        loading={states.loading || loadingData}
                                        onClick={(e) => handleToggleUpdate(e, task.id)}
                                        edge="end"
                                        aria-label="edit"
                                    >
                                        <EditIcon />
                                    </LoadingButton>
                                    <LoadingButton
                                        sx={{ p: 1, m: 0 }}
                                        loading={states.loading || loadingData}
                                        onClick={(e) => handleActions(e, task.id, "delete")}
                                        edge="end"
                                        aria-label="delete"
                                    >
                                        <DeleteIcon />
                                    </LoadingButton>
                                </Box>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Box sx={{ m: 1 }}>
                                    <Typography>Content: {task.content}</Typography>
                                    <Typography>Date: {task.endDate.split("T")[0]}</Typography>
                                    <Typography>Time: {task.endDate.split("T")[1]}</Typography>
                                </Box>
                                <Divider />
                                {states.updateFields ? (
                                    <Box component={"form"} onSubmit={(e) => handleActions(e, task.id, "update", task)} sx={{ display: "inline-flex", mt: 3, width: "100%" }}>
                                        <TextField
                                            required={true}
                                            type="text"
                                            value={states.content ? states.content : task.content}
                                            onChange={(event) => setContent(event.target.value)}
                                            label="Content"
                                            sx={{ width: "30%", mr: 1, ml: 1 }}
                                        />

                                        <DatePicker
                                            defaultValue={task.endDate}
                                            setSelectedDate={setSelectedDateTime}
                                            error={false}
                                            required
                                            fullWidth
                                            sx={{ width: "34%", mr: 1 }}
                                            id="dateEnd"
                                            label="End Date"
                                        />
                                        <Dropdown
                                            required
                                            callback={setSelectedType}
                                            data={types.map((item) => ({ id: item.id, textEn: item.textEn }))}
                                            label="Type"
                                            id="type"
                                            compRef={refs.type}
                                            defaultValue={task.type}
                                            sx={{ width: "30%", mr: 1 }}
                                        />
                                        <LoadingButton loading={states.loading} sx={{ width: "5%" }} variant="contained" type="submit">
                                            <EditIcon />
                                        </LoadingButton>
                                    </Box>
                                ) : null}
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </List>
            )}
        </Box>
    );
}
