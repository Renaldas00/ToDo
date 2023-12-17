import { useRef, useState } from "react";
import { useSnackbarMessage } from "../Hooks/useSnackBarMessage";
import { useData } from "./useData";

export function useTodo() {
    const [formKey, setFormKey] = useState(0);
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [updateFields, setUpdateFields] = useState(false);
    const [selectedType, setSelectedType] = useState([]);
    const [selectedDateTime, setSelectedDateTime] = useState(null);

    const { getItems } = useData();
    const { sendMessage } = useSnackbarMessage();

    const type = useRef();

    async function handleActions(event, taskId, action, data) {
        event.preventDefault();
        event.stopPropagation();

        setLoading(true);
        const uuid = localStorage.getItem("uuid");

        const createItem = { userId: uuid, type: selectedType, content: content, endDate: selectedDateTime?.toISOString() };
        const updateItem = {
            userId: uuid,
            type: selectedType?.length > 0 ? selectedType : data?.type,
            content: content ? content : data?.content,
            endDate: selectedDateTime?.toISOString() ? selectedDateTime.toISOString() : data?.endDate,
            id: taskId,
        };

        const url = action === "add" ? `https://localhost:7171/api/ToDo` : `https://localhost:7171/api/ToDo/${taskId}`;
        const successMessage = action === "add" ? "Item added" : action === "update" ? "Item updated" : "Item deleted";
        const errorMessage = action === "add" ? "Item not added" : action === "update" ? "Item not updated" : "Item not deleted";
        try {
            const response = await fetch(url, {
                method: action === "add" ? "POST" : action === "update" ? "PUT" : "DELETE",
                headers: {
                    "Content-type": "application/json",
                },
                body: action === "add" ? JSON.stringify(createItem) : action === "update" ? JSON.stringify(updateItem) : null,
            });
            if (response.status === 201 || response.status === 204) {
                setTimeout(() => {
                    setLoading(false);
                    getItems();
                    sendMessage(successMessage, "success");
                    handleReset();
                }, 2000);
            } else {
                setTimeout(() => {
                    setLoading(false);
                    sendMessage(errorMessage, "error");
                }, 2000);
            }
        } catch (error) {
            setLoading(false);
            sendMessage(error, "error");
            throw error;
        }
    }

    const handleToggleUpdate = (event) => {
        event.preventDefault();
        event.stopPropagation();
        setUpdateFields(!updateFields);
    };

    const handleExpand = () => {
        setExpanded(!expanded);
    };

    const handleReset = () => {
        if (type.current) type.current.value = "";
        setContent("");
        setSelectedDateTime(null);
        setSelectedType([]);
        setExpanded(false);
        setFormKey((prev) => prev + 1);
        setUpdateFields(false);
    };

    const refs = {
        type,
    };

    const states = {
        content,
        selectedType,
        loading,
        formKey,
        expanded,
        selectedDateTime,
        updateFields,
    };
    return {
        refs,
        states,
        handleActions,
        setExpanded,
        handleExpand,
        setSelectedType,
        setSelectedDateTime,
        handleToggleUpdate,
        setContent,
    };
}
