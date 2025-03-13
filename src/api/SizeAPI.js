import SizeModel from "../models/SizeModel";
import SizeSampleModel from "../models/SizeSampleModel";
import { API_BASE_URL, axiosInstance } from "../config/config";

const SizeEndpoints = {
    SIZES: `${API_BASE_URL}/staff/api/sizes/`,
    SIZE_SAMPLE: `${API_BASE_URL}/staff/api/size-sample`,
    UPDATE_SIZE: `${API_BASE_URL}/staff/api/sizes/update`,
    CREATE_SIZE: `${API_BASE_URL}/staff/api/sizes/create`
};

class SizeAPI {
    async getAll(productDetailId) {
        return this.fetchData(`${SizeEndpoints.SIZES}${productDetailId}`, "Error fetching sizes", SizeModel);
    }

    async getAllSample() {
        return this.fetchData(SizeEndpoints.SIZE_SAMPLE, "Error fetching size samples", SizeSampleModel);
    }

    async create(sizeData) {
        return this.sendData(`${SizeEndpoints.SIZE_SAMPLE}-create`, sizeData, "Error creating size", "POST");
    }

    async delete(id) {
        return this.sendData(`${SizeEndpoints.SIZE_SAMPLE}-delete/${id}`, null, "Error deleting size", "DELETE");
    }

    async update(sizeData, productDetailId) {
        return this.sendData(`${SizeEndpoints.UPDATE_SIZE}/${productDetailId}`, sizeData, "Error updating size", "PUT");
    }

    async createSizeList(sizeData, productDetailId) {
        return this.sendData(`${SizeEndpoints.CREATE_SIZE}/${productDetailId}`, sizeData, "Error creating size list", "POST");
    }

    async fetchData(url, errorMessage, Model) {
        try {
            const response = await axiosInstance.get(url);
            return response.data.map(item => Model.fromJson(item));
        } catch (error) {
            console.error(errorMessage, error);
            return [];
        }
    }

    async sendData(url, data, errorMessage, method) {
        try {
            const response = await axiosInstance({
                method,
                url,
                data,
                headers: { "Content-Type": "application/json" }
            });
            return response.data;
        } catch (error) {
            console.error(errorMessage, error.response?.data || error.message);
            throw error;
        }
    }
}

export default new SizeAPI();
