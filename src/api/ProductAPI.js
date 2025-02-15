import axios from "axios";
import ProductModel from "../models/ProductModel";

const ShowProduct_API = "http://localhost:8080/api/show-products";

class ProductAPI {
    async getAll() {
        const products = await axios.get(ShowProduct_API);
        return products.data.map((product) => ProductModel.fromJson(product));
    }
}
export default new ProductAPI();