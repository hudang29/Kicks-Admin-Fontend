import axios from "axios";

const CheckLogin_API = "http://localhost:8080/api/login";
class LoginAPI {
    async login(account) {
        try {
            const response = await axios.post(CheckLogin_API, account, {
                headers: {
                    "Content-Type": "application/json",
                }
            });
            return response.data;
        } catch (e) {
            console.error('LoginAPI returned error', e);
        }
    }
}
export default new LoginAPI();