import axios from "axios";
import SupplierModel from "../models/SupplierModel";

const ShowSupplier_API = "http://localhost:8080/api/show-supplier";

class SupplierAPI {
    async getAll() {
        const response = await axios.get(ShowSupplier_API);
        return response.data.map((response) => SupplierModel.fromJson(response));
    }

    async getById(id) {
        const response = await axios.get(`${ShowSupplier_API}/${id}`);
        return SupplierModel.fromJson(response.data);
    }
}

export default new SupplierAPI();