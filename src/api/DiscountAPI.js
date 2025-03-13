import DiscountModel from "../models/DiscountModel";
import { API_BASE_URL, axiosInstance } from "../config/config";

const SHOW_DISCOUNT_API = `${API_BASE_URL}/staff/api/product-discount`;

class DiscountAPI {
    async getAll() {
        try {
            const response = await axiosInstance.get(SHOW_DISCOUNT_API);
            return response.data.map(DiscountModel.fromJson);
        } catch (error) {
            console.error("Error fetching discount list:", error);
            return [];
        }
    }

    async getDiscount(id) {
        try {
            const response = await axiosInstance.get(`${SHOW_DISCOUNT_API}/${id}`);
            return DiscountModel.fromJson(response.data);
        } catch (error) {
            console.error(`Error fetching discount with ID ${id}:`, error);
            return null;
        }
    }
}

export default new DiscountAPI();
