import axios from "axios";
import ProductDetailModel from "../models/ProductDetailModel";

const ShowProductDetail_API = "http://localhost:8080/api/list-product-detail/";
const ShowProductDetailById_API = "http://localhost:8080/api/product-detail/";
const UpdateProductDetailById_API = "http://localhost:8080/api/product-detail/";

class ProductDetainAPI {
    async getAll(id) {
        const details = await axios.get(ShowProductDetail_API + id);
        return details.data.map((detail) => ProductDetailModel.fromJson(detail));
    }

    async getDetailByID(id) {
        const details = await axios.get(ShowProductDetailById_API + id);
        return ProductDetailModel.fromJson(details.data);
    }

    async updateProductDetail(productDetail) {
        try {
            const response = await axios.put(`${UpdateProductDetailById_API}`, productDetail);
            return response.data; // Trả về dữ liệu phản hồi từ API
        } catch (error) {
            console.error("Lỗi khi cập nhật sản phẩm:", error);
            throw error; // Ném lỗi để xử lý ở nơi gọi hàm
        }
    }
}

export default new ProductDetainAPI();