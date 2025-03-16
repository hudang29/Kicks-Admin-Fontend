import StaffModel from "../models/StaffModel";
import {API_BASE_URL} from "../config/config";
import {sendData, fetchData, fetchDataSingle} from "../utils/DataAPI";

const StaffEndpoints = {
    SHOW: `${API_BASE_URL}/manager/api/show-employee`,
    CHECK_PASSWORD: `${API_BASE_URL}/manager/api/check-exists-password`,
    CREATE: `${API_BASE_URL}/manager/api/create-employee`,
    UPDATE: `${API_BASE_URL}/manager/api/update-employee`,
    CHANGE_STATUS: `${API_BASE_URL}/manager/api/change-status-employee`,
    CREATE_PASSWORD: `${API_BASE_URL}/manager/api/create-password`,
    ROLES: `${API_BASE_URL}/manager/api/roles`
};

class StaffAPI {
    async getAll() {
        return fetchData(StaffEndpoints.SHOW, "Error fetching staff list", StaffModel);
    }

    async getRoles() {
        return fetchData(StaffEndpoints.ROLES, "Error fetching roles");
    }

    async getById(id) {
        return fetchDataSingle(`${StaffEndpoints.SHOW}/${id}`, "Error fetching staff", StaffModel);
    }

    async checkPasswordExists(id) {
        return fetchDataSingle(`${StaffEndpoints.CHECK_PASSWORD}/${id}`, "Error checking password existence");
    }

    async create(data) {
        return sendData(StaffEndpoints.CREATE, data, "Error creating staff", "POST");
    }

    async update(data) {
        return sendData(StaffEndpoints.UPDATE, data, "Error updating staff", "PUT");
    }

    async changeStatus(data) {
        return sendData(StaffEndpoints.CHANGE_STATUS, data, "Error changing staff status", "PUT");
    }

    async createPassword(data) {
        return sendData(StaffEndpoints.CREATE_PASSWORD, data, "Error creating password", "POST");
    }
}

export default new StaffAPI();
