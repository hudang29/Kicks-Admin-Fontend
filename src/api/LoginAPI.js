import {API_BASE_URL} from "../config/config";
import {sendData} from "../utils/DataAPI";

const AuthEndpoints = {
    LOGIN: `${API_BASE_URL}/api/login`,
    LOGOUT: `${API_BASE_URL}/api/logout`,
    FORGOT: `${API_BASE_URL}/api/forgot-password`,
};

class LoginAPI {
    async login(account) {
        return sendData(AuthEndpoints.LOGIN, account, "Login failed", "POST");
    }

    async logout() {
        return sendData(AuthEndpoints.LOGOUT, null, "Logout failed", "POST");
    }

    async forgotPassword(email) {
        return sendData(AuthEndpoints.FORGOT, email, "Forgot password", "PUT");
    }
}

export default new LoginAPI();
