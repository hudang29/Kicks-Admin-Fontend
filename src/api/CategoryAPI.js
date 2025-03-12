
import ShoesCategoryModel from "../models/ShoesCategoryModel";
import GenderCategoryModel from "../models/GenderCategoryModel";
import {API_BASE_URL, axiosInstance} from "../config/config";

const ShoesCategory_API = `${API_BASE_URL}/staff/api/shoes-category/`;
const ShoesCategoryByGenderCategoryId_API = `${API_BASE_URL}/staff/api/shoes-categories/`;
const GenderCategory_API = `${API_BASE_URL}/staff/api/gender-category`;

class CategoryAPI {
    async getAllCategoryShoesByGenderId(id) {
        const response = await axiosInstance.get(`${ShoesCategoryByGenderCategoryId_API}${id}`);
        return response.data.map((response) => ShoesCategoryModel.fromJson(response));
    }

    async getAllGenderCategory() {
        const response = await axiosInstance.get(`${GenderCategory_API}`);
        return response.data.map((response) => GenderCategoryModel.fromJson(response));
    }

    async getShoesCategoryById(id) {
        try {
            const response = await axiosInstance.get(`${ShoesCategory_API}${id}`);
            return ShoesCategoryModel.fromJson(response.data); // Chỉ cần một object, không cần `.map()`
        } catch (error) {
            console.error("Lỗi khi lấy danh mục giày:", error);
            return null; // Tránh lỗi khi sử dụng dữ liệu
        }
    }

    async getGenderCategoryById(id) {
        try {
            const response = await axiosInstance.get(`${GenderCategory_API}/${id}`);
            return GenderCategoryModel.fromJson(response.data) // Chỉ cần một object, không cần `.map()`
        } catch (error) {
            console.error("Lỗi khi lấy danh mục giới tính:", error);
            return null;
        }
    }
}

export default new CategoryAPI();