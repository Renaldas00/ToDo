import { useState, useRef } from "react";
import { useSnackbarMessage } from "../Hooks/useSnackBarMessage";
import { useNavigate } from "react-router-dom";

export function useAuthentication() {
    const [formKey, setFormKey] = useState(0);
    const [loading, setLoading] = useState(false);
    const [isRegister, setIsRegister] = useState(false);

    const userName = useRef();
    const password = useRef();
    const email = useRef();
    const navigate = useNavigate();
    const { sendMessage } = useSnackbarMessage();

    async function handleAuthentification(event) {
        event.preventDefault();
        setLoading(true);
        const register = { userName: userName.current.value, password: password.current.value, email: email.current?.value };

        const url = isRegister ? "https://localhost:7171/api/Auth" : `https://localhost:7171/api/Auth?username=${userName.current.value}&password=${password.current.value}`;

        const successMessage = isRegister ? "Registration successful" : "Login successful";
        const errorMessage = isRegister ? "Registration failed" : "User doesnt exist";

        let response;
        try {
            response = await fetch(url, {
                method: isRegister ? "POST" : "GET",
                headers: {
                    "Content-type": "application/json",
                },
                body: isRegister ? JSON.stringify(register) : null,
            });
            if (response.status === 200) {
                const data = response ? await response?.json() : null;
                localStorage.setItem("userName", data?.userName);
                localStorage.setItem("uuid", data?.id);
            }
        } catch (error) {
            setLoading(false);
            sendMessage(error, "error");
            throw error;
        } finally {
            if (response.status === 200) {
                setTimeout(() => {
                    setLoading(false);
                    sendMessage(successMessage, "success");
                    navigate("/");
                    handleReset();
                }, 2000);
            } else {
                setTimeout(() => {
                    setLoading(false);
                    sendMessage(errorMessage, "error");
                }, 2000);
            }
        }
    }

    const handleLogout = () => {
        localStorage.clear();
        window.location.reload();
        navigate("/login");
    };

    const handleToggleForm = () => {
        setIsRegister(!isRegister);
    };

    const handleReset = () => {
        setFormKey((prev) => prev + 1);
        setIsRegister(false);
        setLoading(false);
        if (userName.current) userName.current.value = "";
        if (password.current) password.current.value = "";
        if (email.current) email.current.value = "";
    };

    const refs = {
        userName,
        password,
        email,
    };

    const states = {
        formKey,
        loading,
        isRegister,
    };

    return {
        refs,
        states,
        handleToggleForm,
        handleAuthentification,
        handleLogout,
    };
}
