import axios from "axios";
import CategoryModel from "../models/CategoryModel";

const ShowSize_API = "http://localhost:8080/api/product-detail/";

class SizeAPI {
    async getAll(id) {
        const category = await axios.get(ShowSize_API+id);
        return category.data.map((data) => CategoryModel.fromJson(data));
    }
}
export default new CategoryModel();