import ProductDetailModel from "../models/ProductDetailModel";
import {axiosInstance} from "../utils/Util";

const ShowProductDetail_API = "http://localhost:8080/staff/api/list-product-detail/";
const ShowProductDetailById_API = "http://localhost:8080/staff/api/product-detail/";
const UpdateProductDetail_API = "http://localhost:8080/staff/api/product-detail-update";
const CreateProductDetail_API = "http://localhost:8080/staff/api/product-detail-create";

class ProductDetainAPI {
    async getAll(id) {
        const details = await axiosInstance.get(ShowProductDetail_API + id);
        return details.data.map((detail) => ProductDetailModel.fromJson(detail));
    }

    async getDetailByID(id) {
        const details = await axiosInstance.get(ShowProductDetailById_API + id);
        return ProductDetailModel.fromJson(details.data);
    }

    async updateProductDetail(productDetail) {
        try {
            const response = await axiosInstance.put(`${UpdateProductDetail_API}`, productDetail, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            console.log("✅ Phản hồi từ server:", response.data);
            return response.data; // Trả về dữ liệu phản hồi từ API
        } catch (error) {
            console.error("Lỗi khi cập nhật chi tiết sản phẩm:", error);
            throw error; // Ném lỗi để xử lý ở nơi gọi hàm
        }
    }

    async createProductDetail(productDetail) {
        try{
            const response = await axiosInstance.post(`${CreateProductDetail_API}`, productDetail, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            return response.data;
        }
        catch (error) {
            console.error("Lỗi khi thêm chi tiết sản phẩm:", error);
            throw error;
        }
    }
}

export default new ProductDetainAPI();