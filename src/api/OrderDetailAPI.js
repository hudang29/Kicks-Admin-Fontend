import {API_BASE_URL, axiosInstance} from "../config/config";
import OrderDetailModel from "../models/OrderDetailModel";
import {fetchData} from "../utils/DataAPI";

const OrderDetailEndpoints = {
    ORDER_DETAILS: `${API_BASE_URL}/staff/api/order-details`
};

class OrderDetailAPI {
    async getOrderDetails(id) {
        return fetchData(`${OrderDetailEndpoints.ORDER_DETAILS}/${id}`,
            "Error fetching order details",
            OrderDetailModel);
    }
}

export default new OrderDetailAPI();
