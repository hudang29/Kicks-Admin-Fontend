import SupplierModel from "../models/SupplierModel";
import {API_BASE_URL, axiosInstance} from "../config/config";

const ShowSupplier_API = `${API_BASE_URL}/staff/api/show-supplier`;

class SupplierAPI {
    async getAll() {
        const response = await axiosInstance.get(ShowSupplier_API);
        return response.data.map((response) => SupplierModel.fromJson(response));
    }

    async getById(id) {
        const response = await axiosInstance.get(`${ShowSupplier_API}/${id}`);
        return SupplierModel.fromJson(response.data);
    }
}

export default new SupplierAPI();