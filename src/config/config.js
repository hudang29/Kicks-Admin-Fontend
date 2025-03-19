import axios from "axios";

export const API_BASE_URL = "http://localhost:8080";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:8080",
    withCredentials: true, // request sẽ gửi cookie
    headers: {
        "Content-Type": "application/json",
    }
});

// Thêm Interceptor để xử lý lỗi 403
axiosInstance.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 403) {
            let count = 3;
            const countdown = setInterval(() => {
                if (count > 0) {
                    alert(`Your session has expired. Redirecting in ${count} seconds...`);
                    count--;
                } else {
                    clearInterval(countdown);
                    window.location.href = "/login"; // Redirect to login page
                }
            }, 1000); // Show alert every second
        }
        return Promise.reject(error);
    }
);