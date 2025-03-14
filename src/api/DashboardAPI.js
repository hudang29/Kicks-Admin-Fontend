import {API_BASE_URL, axiosInstance} from "../config/config";

const DashboardEndpoints = {
    BEST_SELLERS: `${API_BASE_URL}/admin/api/dashboard/get-top3-bestseller`,
    LOW_STOCK: `${API_BASE_URL}/admin/api/dashboard/get-low-stock`,
    TOTAL_REVENUE_BY_STATUS: `${API_BASE_URL}/admin/api/dashboard/total-revenue-by-status`,
    LATEST_ORDERS: `${API_BASE_URL}/admin/api/dashboard/get-latest-orders`,
    TOTAL_REVENUE: `${API_BASE_URL}/admin/api/dashboard/total-revenue`,
    TOTAL_REVENUE_ORDERS: `${API_BASE_URL}/admin/api/dashboard/total-revenue-orders`,
    SALES_GRAPH: `${API_BASE_URL}/admin/api/dashboard/`
};

class DashboardAPI {
    async bestSellers() {
        return this.fetchData(DashboardEndpoints.BEST_SELLERS,
            "Error fetching best sellers data");
    }

    async findLowStock(stock) {
        return this.fetchData(DashboardEndpoints.LOW_STOCK,
            "Error fetching low stock data", {params: {stock}});
    }

    async getLatestOrders() {
        return this.fetchData(DashboardEndpoints.LATEST_ORDERS,
            "Error fetching latest orders");
    }

    async getTotalRevenue() {
        return this.fetchData(DashboardEndpoints.TOTAL_REVENUE,
            "Error fetching total revenue");
    }

    async getTotalRevenueOrders() {
        return this.fetchData(DashboardEndpoints.TOTAL_REVENUE_ORDERS,
            "Error fetching total revenue orders");
    }

    async getTotalRevenueByStatus() {
        return this.fetchData(DashboardEndpoints.TOTAL_REVENUE_BY_STATUS,
            "Error fetching total revenue by status");
    }

    async getSalesGraphByMonth(year) {
        return this.fetchData(`${DashboardEndpoints.SALES_GRAPH}sales-graph/${year}`,
            "Error fetching sales graph by month");
    }

    async getSalesGraphByYear() {
        return this.fetchData(`${DashboardEndpoints.SALES_GRAPH}sales-graph-year`,
            "Error fetching sales graph by year");
    }

    async fetchData(url, errorMessage, config = {}) {
        try {
            const response = await axiosInstance.get(url, config);
            return response.data;
        } catch (error) {
            console.error(errorMessage, error);
            return null;
        }
    }
}

export default new DashboardAPI();
