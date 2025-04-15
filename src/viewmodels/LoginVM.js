import LoginAPI from "../api/LoginAPI";
import {useState} from "react";
import loginAPI from "../api/LoginAPI";

function LoginVM() {
    const [message, setMessage] = useState("");
    const [email, setEmail] = useState("");

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
            sessionStorage.clear();
        } catch (error) {
            console.error("Logout error", error);
        }
    };

    const handleResetPassword = async () => {
        try {
            const response = await loginAPI.forgotPassword(email);
            console.log(response);
            if(response){
                setMessage("successful! Check your email");
                setTimeout(() => setMessage(""), 1300);
            } else {
                setMessage("Failed to reset your password! Please try again");
                setTimeout(() => setMessage(""), 1300);
            }
        } catch (error) {
            setMessage("Failed to reset your password! Please try again");
            setTimeout(() => setMessage(""), 1300);
            console.error("Reset error", error);
        }
    }

    return {
        message, email, setEmail,
        handleLogin,
        handleLogout,
        handleResetPassword,
    };
}

export default LoginVM;