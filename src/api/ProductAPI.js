import axios from "axios";
import ProductModel from "../models/ProductModel";

const ShowProduct_API = "http://localhost:8080/api/list-product";

class ProductAPI {
    async getAll() {
        const response = await axios.get(ShowProduct_API);
        return response.data.map((response) => ProductModel.fromJson(response));
    }
    async getProductById(id) {
        const response = await axios.get(`${ShowProduct_API}/${id}`);
        return ProductModel.fromJson(response.data);
    }
}
export default new ProductAPI();