import LoginAPI from "../api/LoginAPI";
import {useState} from "react";

function LoginVM() {
    const [message, setMessage] = useState("");

    const handleLogin = async (navigate) => {
        const email = document.getElementById("email")?.value.trim();
        const password = document.getElementById("password")?.value.trim();

        if (!email || !password) {
            alert("Please enter your email and password");
            return;
        }

        try {
            const response = await LoginAPI.login({email, password});

            if (response?.success) {
                setMessage("Login successful! Please wait...");
                sessionStorage.setItem("employeeId", response?.employeeId);
                sessionStorage.setItem("role", response?.role);

                setTimeout(() => {
                    navigate("/profile");
                    setMessage("");
                }, 1900);
            } else {
                setMessage("Login failed! Please try again");
                setTimeout(() => setMessage(""), 900);
            }
        } catch (error) {
            console.error("Login error", error);
            setMessage("Login failed! Please try again");
            setTimeout(() => setMessage(""), 1000);
        }
    };

    const handleLogout = async () => {
        try {
            await LoginAPI.logout();
        } catch (error) {
            console.error("Logout error", error);
        }
    };

    return {
        message,
        handleLogin,
        handleLogout
    };
}

export default LoginVM;