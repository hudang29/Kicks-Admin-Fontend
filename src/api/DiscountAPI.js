import DiscountModel from "../models/DiscountModel";
import {axiosInstance} from "../utils/Util";

const ShowDiscount_API = "http://localhost:8080/staff/api/product-discount";

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