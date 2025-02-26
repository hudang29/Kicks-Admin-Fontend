import axios from "axios";
import ProductModel from "../models/ProductModel";

const ShowProduct_API = "http://localhost:8080/api/list-product";
const UpdateProduct_API = "http://localhost:8080/api/product-update";
const CreateProduct_API = "http://localhost:8080/api/product-create";

class ProductAPI {
    async getAll() {
        const response = await axios.get(ShowProduct_API);
        return response.data.map((response) => ProductModel.fromJson(response));
    }

    async getProductById(id) {
        const response = await axios.get(`${ShowProduct_API}/${id}`);
        return ProductModel.fromJson(response.data);
    }

    async updateProduct(product) {
        try {
            const response = await axios.put(`${UpdateProduct_API}`, product, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            console.log("✅ Phản hồi từ server:", response.data);
            return response.data; // Trả về dữ liệu phản hồi từ API
        } catch (error) {
            console.error("Lỗi khi cập nhật sản phẩm:", error);
            throw error; // Ném lỗi để xử lý ở nơi gọi hàm
        }
    }

    async createProduct(product) {
        try {
            const response = await axios.post(`${CreateProduct_API}`, product, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            console.log("✅ Phản hồi từ server:", response.data);
            return response.data; // Trả về dữ liệu phản hồi từ API
        } catch (error) {
            console.error("Lỗi khi cập nhật sản phẩm:", error);
            throw error; // Ném lỗi để xử lý ở nơi gọi hàm
        }
    }
}

export default new ProductAPI();