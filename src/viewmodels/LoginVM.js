
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
        try {
            const response = await LoginAPI.login({ email: email, password: password});
            if(response.success){
                setMessage("Login Successful! Wait a second");
                setTimeout(() => {
                    navigate("/profile");
                    setMessage("");
                }, 1900);

            } else {
                setMessage("Login failed! Please try again");
                setTimeout(() => setMessage(""), 900);
            }


        } catch (error) {
            console.error("Login failed", error);
            setMessage("Login failed! Please try again");
            setTimeout(() => setMessage(""), 1000);
        }
    }

    const activeLogin =  () => {
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        return (email !== "" && password !== "" && email !== null && password !== null )


    }

    const handleLogout = async () => {
        try {
            await LoginAPI.logout();
        } catch (error) {
            console.log(error);
        }
    }

    return {
        message,
        handleLogin, activeLogin, handleLogout
    }
}

export default LoginVM;