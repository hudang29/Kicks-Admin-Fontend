import DiscountModel from "../models/DiscountModel";
import {API_BASE_URL, axiosInstance} from "../config/config";

const ShowDiscount_API = `${API_BASE_URL}/staff/api/product-discount`;

class DiscountAPI{
    async getAll() {
        const response = await axiosInstance.get(ShowDiscount_API);
        return response.data.map((response) => DiscountModel.fromJson(response));
    }
    async getDiscount(id) {
        const response = await axiosInstance.get(`${ShowDiscount_API}/${id}`);
        return DiscountModel.fromJson(response.data);
    }
}
export default new DiscountAPI();