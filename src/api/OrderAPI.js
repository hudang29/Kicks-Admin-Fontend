import OrderModel from "../models/OrderModel";
import {axiosInstance} from "../utils/Util";

const ShowOrder_API = "http://localhost:8080/staff/api/show-orders";
const ShowOrderByStatus_API = "http://localhost:8080/staff/api/orders-by-status";

class OrderAPI {
    async getAll() {
        const orders = await axiosInstance.get(ShowOrder_API);
        return orders.data.map((order) => OrderModel.fromJson(order));
    }

    async getAllByStatus(status) {
        try {
            const orders = await axiosInstance.get(ShowOrderByStatus_API, {
                params: {status}
            });
            return orders.data.map((order) => OrderModel.fromJson(order));
        } catch (error) {
            console.log(error);
        }
    }
}

export default new OrderAPI();