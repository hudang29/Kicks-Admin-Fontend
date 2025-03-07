import axios from "axios";

const BestSellers_API = "http://localhost:8080/api/dashboard/get-top3-bestseller";
const LowStock_API = "http://localhost:8080/api/dashboard/get-low-stock";
const TotalRevenueByStatus_API = "http://localhost:8080/api/dashboard/total-revenue-by-status";
const LatestOrders_API = "http://localhost:8080/api/dashboard/get-latest-orders";
const TotalRevenue_API = "http://localhost:8080/api/dashboard/total-revenue";
const TotalRevenueOrders_API = "http://localhost:8080/api/dashboard/total-revenue-orders";


class DashboardAPI {
    async bestSellers() {
        try {
            const response = await axios.get(`${BestSellers_API}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching low stock data:", error);
        }
    }

    async findLowStock(threshold) {
        try {
            const response = await axios.get(`${LowStock_API}`, {
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
            const response = await axios.get(`${LatestOrders_API}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching low stock data:", error);
        }
    }

    async getTotalRevenue() {
        try {
            const response = await axios.get(`${TotalRevenue_API}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching low stock data:", error);
        }
    }

    async getTotalRevenueOrders() {
        try {
            const response = await axios.get(`${TotalRevenueOrders_API}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching low stock data:", error);
        }
    }

    async getTotalRevenueByStatus() {
        try {
            const response = await axios.get(`${TotalRevenueByStatus_API}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching low stock data:", error);
        }
    }

}
export default new DashboardAPI();