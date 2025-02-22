import axios from "axios";
import ProductDetailModel from "../models/ProductDetailModel";

const ShowProductDetail_API = "http://localhost:8080/api/list-product-detail/";
const ShowProductDetailById_API = "http://localhost:8080/api/product-detail/";

class ProductDetainAPI {
    async getAll(id) {
        const details = await axios.get(ShowProductDetail_API+id);
        return details.data.map((detail) => ProductDetailModel.fromJson(detail));
    }
    async getDetailByID(id) {
        const details = await axios.get(ShowProductDetailById_API+id);
        return ProductDetailModel.fromJson(details.data);
    }
}
export default new ProductDetainAPI();