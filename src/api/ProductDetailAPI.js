import axios from "axios";
import ProductDetailModel from "../models/ProductDetailModel";

const ShowProductDetail_API = "http://localhost:8080/api/show-product/";

class ProductAPI {
    async getAll(id) {
        const details = await axios.get(ShowProductDetail_API+id);
        return details.data.map((detail) => ProductDetailModel.fromJson(detail));
    }
}
export default new ProductAPI();