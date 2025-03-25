import SupplierModel from "../models/SupplierModel";
import { API_BASE_URL } from "../config/config";
import {fetchData, fetchDataSingle, sendData} from "../utils/DataAPI";

const SupplierEndpoints = {
    SHOW: `${API_BASE_URL}/staff/api/show-supplier`,
    CREATE: `${API_BASE_URL}/staff/api/create-supplier`,
    UPDATE: `${API_BASE_URL}/staff/api/update-supplier`,
};

class SupplierAPI {
    async getAll() {
        return fetchData(SupplierEndpoints.SHOW,
            "Error loading Supplier list",
            SupplierModel);
    }

    async getById(id) {
        return fetchDataSingle(`${SupplierEndpoints.SHOW}/${id}`,
            "Error loading Supplier",
            SupplierModel);
    }

    async create(data) {
        return sendData(SupplierEndpoints.CREATE, data,
            "Error creating Supplier",
            "POST");
    }
    async update(data) {
        return sendData(SupplierEndpoints.UPDATE, data,
            "Error updating Supplier",
            "PUT");
    }
}

export default new SupplierAPI();
