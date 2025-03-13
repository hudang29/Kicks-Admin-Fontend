import StaffModel from "../models/StaffModel";
import {API_BASE_URL, axiosInstance} from "../config/config";

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
        return this.fetchData(StaffEndpoints.SHOW, "Error fetching staff list", StaffModel);
    }

    async getRoles() {
        return this.fetchData(StaffEndpoints.ROLES, "Error fetching roles");
    }

    async getById(id) {
        return this.fetchDataSingle(`${StaffEndpoints.SHOW}/${id}`, "Error fetching staff", StaffModel);
    }

    async checkPasswordExists(id) {
        return this.fetchDataSingle(`${StaffEndpoints.CHECK_PASSWORD}/${id}`, "Error checking password existence");
    }

    async create(data) {
        return this.sendData(StaffEndpoints.CREATE, data, "Error creating staff", "POST");
    }

    async update(data) {
        return this.sendData(StaffEndpoints.UPDATE, data, "Error updating staff", "PUT");
    }

    async changeStatus(data) {
        return this.sendData(StaffEndpoints.CHANGE_STATUS, data, "Error changing staff status", "PUT");
    }

    async createPassword(data) {
        return this.sendData(StaffEndpoints.CREATE_PASSWORD, data, "Error creating password", "POST");
    }

    async fetchData(url, errorMessage, Model = null) {
        try {
            const response = await axiosInstance.get(url);
            return Model ? response.data.map(item => Model.fromJson(item)) : response.data;
        } catch (error) {
            console.error(errorMessage, error);
            return Model ? [] : null;
        }
    }

    async fetchDataSingle(url, errorMessage, Model = null) {
        try {
            const response = await axiosInstance.get(url);
            return Model ? Model.fromJson(response.data) : response.data;
        } catch (error) {
            console.error(errorMessage, error);
            return Model ? null : false;
        }
    }

    async sendData(url, data, errorMessage, method) {
        try {
            const response = await axiosInstance({
                method,
                url,
                data,
                headers: {"Content-Type": "application/json"}
            });
            return response.data;
        } catch (error) {
            console.error(errorMessage, error.response?.data || error.message);
            throw error;
        }
    }
}

export default new StaffAPI();
