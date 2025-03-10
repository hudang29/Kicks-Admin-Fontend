import axios from "axios";
import DiscountModel from "../models/DiscountModel";

const ShowDiscount_API = "http://localhost:8080/api/product-discount";

class DiscountAPI{
    async getAll() {
        const response = await axios.get(ShowDiscount_API);
        return response.data.map((response) => DiscountModel.fromJson(response));
    }
    async getDiscount(id) {
        const response = await axios.get(`${ShowDiscount_API}/${id}`);
        return DiscountModel.fromJson(response.data);
    }
}
export default new DiscountAPI();