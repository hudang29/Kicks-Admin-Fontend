import {API_BASE_URL, axiosInstance} from "../config/config";
import OrderDetailModel from "../models/OrderDetailModel";

const OrderDetailEndpoints = {
    ORDER_DETAILS: `${API_BASE_URL}/staff/api/order-details`
};

class OrderDetailAPI {
    async getOrderDetails(id) {
        return this.fetchData(`${OrderDetailEndpoints.ORDER_DETAILS}/${id}`,
            "Error fetching order details", OrderDetailModel);
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
}

export default new OrderDetailAPI();
