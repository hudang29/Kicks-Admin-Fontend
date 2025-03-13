import ShoesCategoryModel from "../models/ShoesCategoryModel";
import GenderCategoryModel from "../models/GenderCategoryModel";
import {API_BASE_URL, axiosInstance} from "../config/config";

const CategoryEndpoints = {
    SHOES_CATEGORY: `${API_BASE_URL}/staff/api/shoes-category/`,
    SHOES_CATEGORY_BY_GENDER: `${API_BASE_URL}/staff/api/shoes-categories/`,
    GENDER_CATEGORY: `${API_BASE_URL}/staff/api/gender-category`
};

class CategoryAPI {
    async getAllCategoryShoesByGenderId(id) {
        return this.fetchData(
            `${CategoryEndpoints.SHOES_CATEGORY_BY_GENDER}${id}`,
            "Error fetching shoe categories by gender",
            ShoesCategoryModel
        );
    }

    async getAllGenderCategory() {
        return this.fetchData(
            CategoryEndpoints.GENDER_CATEGORY,
            "Error fetching gender categories",
            GenderCategoryModel
        );
    }

    async getShoesCategoryById(id) {
        return this.fetchDataSingle(
            `${CategoryEndpoints.SHOES_CATEGORY}${id}`,
            "Error fetching shoe category",
            ShoesCategoryModel
        );
    }

    async getGenderCategoryById(id) {
        return this.fetchDataSingle(
            `${CategoryEndpoints.GENDER_CATEGORY}/${id}`,
            "Error fetching gender category",
            GenderCategoryModel
        );
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
}

export default new CategoryAPI();
