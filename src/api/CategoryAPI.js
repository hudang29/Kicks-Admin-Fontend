import ShoesCategoryModel from "../models/ShoesCategoryModel";
import GenderCategoryModel from "../models/GenderCategoryModel";
import {API_BASE_URL} from "../config/config";
import {fetchData, fetchDataSingle} from "../utils/DataAPI";

const CategoryEndpoints = {
    SHOES_CATEGORY: `${API_BASE_URL}/staff/api/shoes-category/`,
    SHOES_CATEGORY_BY_GENDER: `${API_BASE_URL}/staff/api/shoes-categories/`,
    GENDER_CATEGORY: `${API_BASE_URL}/staff/api/gender-category`
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
}

export default new CategoryAPI();
