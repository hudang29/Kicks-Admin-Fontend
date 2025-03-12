
import {API_BASE_URL, axiosInstance} from "../config/config";

const BestSellers_API = `${API_BASE_URL}/admin/api/dashboard/get-top3-bestseller`;
const LowStock_API = `${API_BASE_URL}/admin/api/dashboard/get-low-stock`;
const TotalRevenueByStatus_API = `${API_BASE_URL}/admin/api/dashboard/total-revenue-by-status`;
const LatestOrders_API = `${API_BASE_URL}/admin/api/dashboard/get-latest-orders`;
const TotalRevenue_API = `${API_BASE_URL}/admin/api/dashboard/total-revenue`;
const TotalRevenueOrders_API = `${API_BASE_URL}/admin/api/dashboard/total-revenue-orders`;
const SaleGraph_API = `${API_BASE_URL}/admin/api/dashboard/`;


class DashboardAPI {
    async bestSellers() {
        try {
            const response = await axiosInstance.get(`${BestSellers_API}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching low stock data:", error);
        }
    }

    async findLowStock(threshold) {
        try {
            const response = await axiosInstance.get(`${LowStock_API}`, {
                params: {threshold}
            });
            console.log(response.data);
            return response.data;
        } catch (e) {
            console.error("Error fetching low stock data:", e);
        }
    }

    async getLatestOrders() {
        try {
            const response = await axiosInstance.get(`${LatestOrders_API}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching low stock data:", error);
        }
    }

    async getTotalRevenue() {
        try {
            const response = await axiosInstance.get(`${TotalRevenue_API}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching low stock data:", error);
        }
    }

    async getTotalRevenueOrders() {
        try {
            const response = await axiosInstance.get(`${TotalRevenueOrders_API}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching low stock data:", error);
        }
    }

    async getTotalRevenueByStatus() {
        try {
            const response = await axiosInstance.get(`${TotalRevenueByStatus_API}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching low stock data:", error);
        }
    }

    async getSalesGraphByMonth(year) {
        try {
            const response = await axiosInstance.get(`${SaleGraph_API}sales-graph/${year}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching data monthly: ", error);
        }
    }

    async getSalesGraphByYear() {
        try {
            const response = await axiosInstance.get(`${SaleGraph_API}sales-graph-year`);
            return response.data;
        } catch (error) {
            console.error("Error fetching data yearly: ", error);
        }
    }

}
export default new DashboardAPI();