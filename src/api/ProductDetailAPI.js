import ProductDetailModel from "../models/ProductDetailModel";
import {API_BASE_URL, axiosInstance} from "../config/config";

const ProductDetailEndpoints = {
    LIST: `${API_BASE_URL}/staff/api/list-product-detail/`,
    DETAIL: `${API_BASE_URL}/staff/api/product-detail/`,
    UPDATE: `${API_BASE_URL}/staff/api/product-detail-update`,
    CREATE: `${API_BASE_URL}/staff/api/product-detail-create`,
    COLOR: `${API_BASE_URL}/staff/api/list-color/`,
};

class ProductDetailAPI {
    async getAll(productId) {
        return this.fetchData(`${ProductDetailEndpoints.LIST}${productId}`, "Error fetching details", ProductDetailModel);
    }

    async getColorProductId(productId) {
        try {
            const response = await axiosInstance.get(`${ProductDetailEndpoints.COLOR}${productId}`)
            return response.data;
        } catch (error) {
            console.error("Error fetching color", error);
            return [];
        }
    }

    async getDetailByID(id) {
        return this.fetchDataSingle(`${ProductDetailEndpoints.DETAIL}${id}`, "Error fetching product detail by ID", ProductDetailModel);
    }

    async updateProductDetail(productDetail) {
        return this.sendData(ProductDetailEndpoints.UPDATE, productDetail, "Error updating product detail", "PUT");
    }

    async createProductDetail(productDetail) {
        return this.sendData(ProductDetailEndpoints.CREATE, productDetail, "Error creating product detail", "POST");
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

    async fetchDataSingle(url, errorMessage, Model) {
        try {
            const response = await axiosInstance.get(url);
            return Model.fromJson(response.data);
        } catch (error) {
            console.error(errorMessage, error);
            return null;
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
            console.error(errorMessage, error);
            throw error;
        }
    }
}

export default new ProductDetailAPI();
