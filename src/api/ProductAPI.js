import ProductModel from "../models/ProductModel";
import {API_BASE_URL, axiosInstance} from "../config/config";

const ShowProduct_API = `${API_BASE_URL}/staff/api/list-product`;
const ShowPageProduct_API = `${API_BASE_URL}/staff/api/page-product`;
const UpdateProduct_API = `${API_BASE_URL}/staff/api/product-update`;
const CreateProduct_API = `${API_BASE_URL}/staff/api/product-create`;

class ProductAPI {
    async getAll() {
        const response = await axiosInstance.get(ShowProduct_API);
        return response.data.map((response) => ProductModel.fromJson(response));
    }
    async getPageProducts(page) {
        try {
            const response = await axiosInstance.get(ShowPageProduct_API,{
                params: {page}
            });
            return response.data;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async getProductById(id) {
        const response = await axiosInstance.get(`${ShowProduct_API}/${id}`);
        return ProductModel.fromJson(response.data);
    }

    async updateProduct(product) {
        try {
            const response = await axiosInstance.put(`${UpdateProduct_API}`, product, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            console.log("Phản hồi từ server:", response.data);
            return response.data; // Trả về dữ liệu phản hồi từ API
        } catch (error) {
            console.error("Lỗi khi cập nhật sản phẩm:", error);
            throw error; // Ném lỗi để xử lý ở nơi gọi hàm
        }
    }

    async createProduct(product) {
        try {
            const response = await axiosInstance.post(`${CreateProduct_API}`, product, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            console.log("Phản hồi từ server:", response.data);
            return response.data; // Trả về dữ liệu phản hồi từ API
        } catch (error) {
            console.error("Lỗi khi cập nhật sản phẩm:", error);
            throw error; // Ném lỗi để xử lý ở nơi gọi hàm
        }
    }
}

export default new ProductAPI();