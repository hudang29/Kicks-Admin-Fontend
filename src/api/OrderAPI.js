import OrderModel from "../models/OrderModel";
import {API_BASE_URL, axiosInstance} from "../config/config";

const ShowOrder_API = `${API_BASE_URL}/staff/api/show-orders`;
const ShowOrderByStatus_API = `${API_BASE_URL}/staff/api/orders-by-status`;
const OrderStatuses_API = `${API_BASE_URL}/staff/api/statuses`;

class OrderAPI {
    async getAll() {
        const orders = await axiosInstance.get(ShowOrder_API);
        return orders.data.map((order) => OrderModel.fromJson(order));
    }

    async getOrderStatuses() {
        return await axiosInstance.get(OrderStatuses_API);
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