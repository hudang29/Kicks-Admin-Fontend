import {API_BASE_URL} from "../config/config";
import {sendData, fetchDataSingle} from "../utils/DataAPI";
import StaffModel from "../models/StaffModel";
const ProfileEndpoints = {
    SHOW: `${API_BASE_URL}/staff/api/show-profile/`,
    UPDATE_PASSWORD: `${API_BASE_URL}/staff/api/update/password`,
    UPDATE: `${API_BASE_URL}/staff/api/update/profile`,
};

class ProfileAPI {
    async getProfile(id) {
        return fetchDataSingle(`${ProfileEndpoints.SHOW}${id}`, "Error fetching your profile", StaffModel);
    }
    async updateProfile(data) {
        return sendData(ProfileEndpoints.UPDATE, data, "Error updating profile", "PUT");
    }
    async updatePassword(data) {
        return sendData(ProfileEndpoints.UPDATE_PASSWORD, data, "Error updating password", "PUT");
    }
}
export default new ProfileAPI();