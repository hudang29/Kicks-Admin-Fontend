import SupplierModel from "../models/SupplierModel";
import { API_BASE_URL, axiosInstance } from "../config/config";

const SupplierEndpoints = {
    SHOW: `${API_BASE_URL}/staff/api/show-supplier`
};

class SupplierAPI {
    async getAll() {
        return this.fetchData(SupplierEndpoints.SHOW, "Lỗi khi lấy danh sách nhà cung cấp", SupplierModel);
    }

    async getById(id) {
        return this.fetchDataSingle(`${SupplierEndpoints.SHOW}/${id}`, "Lỗi khi lấy thông tin nhà cung cấp", SupplierModel);
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
}

export default new SupplierAPI();
