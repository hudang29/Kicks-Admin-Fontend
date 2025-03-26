import ShoesCategoryModel from "../models/ShoesCategoryModel";
import GenderCategoryModel from "../models/GenderCategoryModel";
import {API_BASE_URL} from "../config/config";
import {fetchData, fetchDataSingle, sendData} from "../utils/DataAPI";

const CategoryEndpoints = {
    SHOES_CATEGORY: `${API_BASE_URL}/staff/api/shoes-category/`,
    SHOES_CATEGORY_BY_GENDER: `${API_BASE_URL}/staff/api/shoes-categories/`,
    GENDER_CATEGORY: `${API_BASE_URL}/staff/api/gender-category`,
    CREATE_GENDER: `${API_BASE_URL}/staff/api/gender-category/add`,
    CREATE_TYPE: `${API_BASE_URL}/staff/api/shoes-category/add`,
    UPDATE_TYPE: `${API_BASE_URL}/staff/api/shoes-category/update`,
    UPDATE_GENDER: `${API_BASE_URL}/staff/api/gender-category/update`,
};

class CategoryAPI {
    async getAllCategoryShoesByGenderId(id) {
        return fetchData(
            `${CategoryEndpoints.SHOES_CATEGORY_BY_GENDER}${id}`,
            "Error fetching shoe categories by gender",
            ShoesCategoryModel
        );
    }

    async getAllGenderCategory() {
        return fetchData(
            CategoryEndpoints.GENDER_CATEGORY,
            "Error fetching gender categories",
            GenderCategoryModel
        );
    }

    async getShoesCategoryById(id) {
        return fetchDataSingle(
            `${CategoryEndpoints.SHOES_CATEGORY}${id}`,
            "Error fetching shoe category",
            ShoesCategoryModel
        );
    }

    async getGenderCategoryById(id) {
        return fetchDataSingle(
            `${CategoryEndpoints.GENDER_CATEGORY}/${id}`,
            "Error fetching gender category",
            GenderCategoryModel
        );
    }

    async createShoesCategory(data) {
        return sendData(CategoryEndpoints.CREATE_TYPE, data, "Error creating shoe category", "POST");
    }

    async updateShoesCategory(data) {
        return sendData(CategoryEndpoints.CREATE_TYPE, data, "Error updating shoe category", "PUT");
    }

    async createGenderCategory(data) {
        return sendData(CategoryEndpoints.CREATE_GENDER, data, "Error creating gender category", "POST");
    }

    async updateGenderCategory(data) {
        return sendData(CategoryEndpoints.UPDATE_GENDER, data, "Error updating gender category", "PUT");
    }
}

export default new CategoryAPI();
