import SupplierModel from "../models/SupplierModel";
import {axiosInstance} from "../utils/Util";

const ShowSupplier_API = "http://localhost:8080/staff/api/show-supplier";

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