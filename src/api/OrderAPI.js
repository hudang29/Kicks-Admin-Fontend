import axios from "axios";
import OrderModel from "../models/OrderModel";

const ShowOrder_API = "http://localhost:8080/api/show-orders";
const ShowOrderByStatus_API = "http://localhost:8080/api/orders-by-status";

class OrderAPI {
    async getAll() {
        const orders = await axios.get(ShowOrder_API);
        return orders.data.map((order) => OrderModel.fromJson(order));
    }

    async getAllByStatus(status) {
        try {
            const orders = await axios.get(ShowOrderByStatus_API, {
                params: {status}
            });
            return orders.data.map((order) => OrderModel.fromJson(order));
        } catch (error) {
            console.log(error);
        }
    }
}

export default new OrderAPI();