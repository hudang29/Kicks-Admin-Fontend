import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:8080",
    withCredentials: true, // 🔥 Mặc định tất cả request sẽ gửi cookie
    headers: {
        "Content-Type": "application/json",
    }
});