import OrderModel from "../models/OrderModel";
import { API_BASE_URL} from "../config/config";
import {fetchData, fetchDataSingle, fetchDataWithParams, sendData} from "../utils/DataAPI";

const OrderEndpoints = {
    ALL_ORDERS: `${API_BASE_URL}/staff/api/show-orders`,
    ORDER_BY_ID: `${API_BASE_URL}/staff/api/order/`,
    ORDERS_BY_STATUS: `${API_BASE_URL}/staff/api/orders-by-status`,
    ORDER_STATUSES: `${API_BASE_URL}/staff/api/statuses`,
    CHANGE_STATUS: `${API_BASE_URL}/staff/api/orders/change-status`,
};

class OrderAPI {
    async getAll() {
        return fetchData(OrderEndpoints.ALL_ORDERS, "Error fetching all orders", OrderModel);
    }

    async getById(id) {
        return fetchDataSingle(`${OrderEndpoints.ORDER_BY_ID}${id}`, "Error fetching order by ID", OrderModel);
    }

    async getOrderStatuses() {
        return fetchData(OrderEndpoints.ORDER_STATUSES, "Error fetching order statuses");
    }

    async getAllByStatus(status) {
        return fetchDataWithParams(OrderEndpoints.ORDERS_BY_STATUS, { status },
            "Error fetching orders by status", OrderModel);
    }

    async updateStatus(data) {
        return sendData(OrderEndpoints.CHANGE_STATUS, data, "Error updating orders status", "PUT");
    }

}

export default new OrderAPI();
