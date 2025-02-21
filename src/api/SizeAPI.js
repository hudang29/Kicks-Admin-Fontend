import axios from "axios";
import SizeModel from "../models/SizeModel";

const ShowSize_API = "http://localhost:8080/api/product-detail/";

class SizeAPI {
    async getAll(id) {
        const sizes = await axios.get(ShowSize_API+id);
        return sizes.data.map((size) => SizeModel.fromJson(size));
    }
}
export default new SizeAPI();