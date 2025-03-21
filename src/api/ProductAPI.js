import ProductModel from "../models/ProductModel";
import {API_BASE_URL, axiosInstance} from "../config/config";
import {fetchDataSingle, fetchDataWithParams, sendData} from "../utils/DataAPI";

const ProductEndpoints = {
    PAGE: `${API_BASE_URL}/staff/api/page-product`,
    UPDATE: `${API_BASE_URL}/staff/api/product-update`,
    CREATE: `${API_BASE_URL}/staff/api/product-create`,
    SHOW: `${API_BASE_URL}/staff/api/list-product`,
};

class ProductAPI {
    async getPageProducts(page) {
        return fetchDataWithParams(ProductEndpoints.PAGE, {page}, "Error fetching paginated products");
    }

    async getProductById(id) {
        return fetchDataSingle(`${ProductEndpoints.SHOW}/${id}`, "Error fetching product by ID", ProductModel);
    }

    async updateProduct(product) {
        return sendData(ProductEndpoints.UPDATE, product, "Error updating product", "PUT");
    }

    async createProduct(product) {
        return sendData(ProductEndpoints.CREATE, product, "Error creating product", "POST");
    }
}

export default new ProductAPI();
