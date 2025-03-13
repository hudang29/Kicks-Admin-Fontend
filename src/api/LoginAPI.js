import { API_BASE_URL, axiosInstance } from "../config/config";

const AuthEndpoints = {
    LOGIN: `${API_BASE_URL}/api/login`,
    LOGOUT: `${API_BASE_URL}/api/logout`
};

class LoginAPI {
    async login(account) {
        return this.postData(AuthEndpoints.LOGIN, account, "Login failed");
    }

    async logout() {
        return this.postData(AuthEndpoints.LOGOUT, null, "Logout failed");
    }

    async postData(url, data, errorMessage) {
        try {
            const response = await axiosInstance.post(url, data, {
                headers: { "Content-Type": "application/json" }
            });
            return response.data;
        } catch (error) {
            console.error(errorMessage, error.response?.data || error.message);
            throw error;
        }
    }
}

export default new LoginAPI();
