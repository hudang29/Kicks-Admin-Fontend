
import LoginAPI from "../api/LoginAPI";
import {useState} from "react";

function LoginVM() {
    const [message, setMessage] = useState("");

    const handleLogin = async(navigate) => {
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        if (!email || !password) {
            alert("Please enter an email and password");
            return;
        }
        setMessage("Login Successful! Wait a second");
        console.log(password);
        console.log(email);
        try {
            const response = await LoginAPI.login({ email: email, password: password});
            console.log("Kết quả đăng nhập:", response.data);
            setTimeout(() => {
                navigate("/profile");
            }, 1900);

        } catch (error) {
            console.error("Lỗi đăng nhập:", error);
            setMessage("Login Failed! Wait a second");
        }
    }

    const activeLogin = () => {
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        return (email !== "" && password !== "" && email !== null && password !== null )
    }

    return {
        message,
        handleLogin, activeLogin,
    }
}

export default LoginVM;