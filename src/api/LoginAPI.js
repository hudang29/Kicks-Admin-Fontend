
import {API_BASE_URL, axiosInstance} from "../config/config";

const CheckLogin_API = `${API_BASE_URL}/api/login`;
const CheckLogout_API = `${API_BASE_URL}/api/logout`;

class LoginAPI {
    async login(account) {
        try {
            const response = await axiosInstance.post(CheckLogin_API, account, {
                headers: {
                    "Content-Type": "application/json",
                }
            });
            return response.data;
        } catch (e) {
            console.error('Login failed', e);
        }
    }

    async logout() {
        try {
            const response = await axiosInstance.post(CheckLogout_API, null, {
                headers: {
                    "Content-Type": "application/json",
                }
            });
            return response.data;
        } catch (e) {
            console.error('Logout failed', e);
        }
    }
}

export default new LoginAPI();