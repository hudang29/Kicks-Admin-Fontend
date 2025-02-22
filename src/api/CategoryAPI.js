import axios from "axios";
import ShoesCategoryModel from "../models/ShoesCategoryModel";
import GenderCategoryModel from "../models/GenderCategoryModel";

const ShoesCategory_API = "http://localhost:8080/api/shoes-category/";
const ShoesCategoryByGenderCategoryId_API = "http://localhost:8080/api/shoes-categories/";
const GenderCategory_API = "http://localhost:8080/api/gender-category";

class CategoryAPI {
    async getAllCategoryShoesByGenderId(id) {
        const response = await axios.get(`${ShoesCategoryByGenderCategoryId_API}${id}`);
        return response.data.map((response) => ShoesCategoryModel.fromJson(response));
    }

    async getAllGenderCategory() {
        const response = await axios.get(`${GenderCategory_API}`);
        return response.data.map((response) => GenderCategoryModel.fromJson(response));
    }

    async getShoesCategoryById(id) {
        try {
            const response = await axios.get(`${ShoesCategory_API}${id}`);
            return ShoesCategoryModel.fromJson(response.data); // Chỉ cần một object, không cần `.map()`
        } catch (error) {
            console.error("Lỗi khi lấy danh mục giày:", error);
            return null; // Tránh lỗi khi sử dụng dữ liệu
        }
    }

    async getGenderCategoryById(id) {
        try {
            const response = await axios.get(`${GenderCategory_API}/${id}`);
            return GenderCategoryModel.fromJson(response.data) // Chỉ cần một object, không cần `.map()`
        } catch (error) {
            console.error("Lỗi khi lấy danh mục giới tính:", error);
            return null;
        }
    }
}

export default new CategoryAPI();