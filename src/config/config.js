import axios from "axios";

export const API_BASE_URL = "http://localhost:8080";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:8080", withCredentials: true, // request sẽ gửi cookie
    headers: {
        "Content-Type": "application/json",
    }
});