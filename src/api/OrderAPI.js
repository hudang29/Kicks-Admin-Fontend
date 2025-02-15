import axios from "axios";
import OrderModel from "../models/OrderModel";

const ShowOrder_API = "http://localhost:8080/api/show-orders";

class OrderAPI {
    async getAll() {
        const orders = await axios.get(ShowOrder_API);
        return orders.data.map((order) => OrderModel.fromJson(order));
    }
}
export default new OrderAPI();