import ProductModel from "../models/ProductModel";
import {API_BASE_URL, axiosInstance} from "../config/config";

const ProductEndpoints = {
    LIST: `${API_BASE_URL}/staff/api/list-product`,
    PAGE: `${API_BASE_URL}/staff/api/page-product`,
    UPDATE: `${API_BASE_URL}/staff/api/product-update`,
    CREATE: `${API_BASE_URL}/staff/api/product-create`
};

class ProductAPI {
    async getAll() {
        return this.fetchData(ProductEndpoints.LIST, "Error fetching product list", ProductModel);
    }

    async getPageProducts(page) {
        return this.fetchDataWithParams(ProductEndpoints.PAGE, {page}, "Error fetching paginated products");
    }

    async getProductById(id) {
        return this.fetchDataSingle(`${ProductEndpoints.LIST}/${id}`, "Error fetching product by ID", ProductModel);
    }

    async updateProduct(product) {
        return this.sendData(ProductEndpoints.UPDATE, product, "Error updating product", "PUT");
    }

    async createProduct(product) {
        return this.sendData(ProductEndpoints.CREATE, product, "Error creating product", "POST");
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

    async fetchDataWithParams(url, params, errorMessage) {
        try {
            const response = await axiosInstance.get(url, {params});
            return response.data;
        } catch (error) {
            console.error(errorMessage, error);
            return null;
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

export default new ProductAPI();
