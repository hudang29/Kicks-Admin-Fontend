import OrderModel from "../models/OrderModel";
import { API_BASE_URL, axiosInstance } from "../config/config";

const OrderEndpoints = {
    ALL_ORDERS: `${API_BASE_URL}/staff/api/show-orders`,
    ORDER_BY_ID: `${API_BASE_URL}/staff/api/order/`,
    ORDERS_BY_STATUS: `${API_BASE_URL}/staff/api/orders-by-status`,
    ORDER_STATUSES: `${API_BASE_URL}/staff/api/statuses`
};

class OrderAPI {
    async getAll() {
        return this.fetchData(OrderEndpoints.ALL_ORDERS, "Error fetching all orders", OrderModel);
    }

    async getById(id) {
        return this.fetchDataSingle(`${OrderEndpoints.ORDER_BY_ID}${id}`, "Error fetching order by ID", OrderModel);
    }

    async getOrderStatuses() {
        return this.fetchRawData(OrderEndpoints.ORDER_STATUSES, "Error fetching order statuses");
    }

    async getAllByStatus(status) {
        return this.fetchDataWithParams(OrderEndpoints.ORDERS_BY_STATUS, { status }, "Error fetching orders by status", OrderModel);
    }

    async fetchData(url, errorMessage, Model) {
        try {
            const response = await axiosInstance.get(url);
            return response.data.map(item => Model.fromJson(item));
        } catch (error) {
            console.error(errorMessage, error);
            return [];
        }
    }

    async fetchDataSingle(url, errorMessage, Model) {
        try {
            const response = await axiosInstance.get(url);
            return Model.fromJson(response.data);
        } catch (error) {
            console.error(errorMessage, error);
            return null;
        }
    }

    async fetchRawData(url, errorMessage) {
        try {
            const response = await axiosInstance.get(url);
            return response.data;
        } catch (error) {
            console.error(errorMessage, error);
            return null;
        }
    }

    async fetchDataWithParams(url, params, errorMessage, Model) {
        try {
            const response = await axiosInstance.get(url, { params });
            return response.data.map(item => Model.fromJson(item));
        } catch (error) {
            console.error(errorMessage, error);
            return [];
        }
    }
}

export default new OrderAPI();
