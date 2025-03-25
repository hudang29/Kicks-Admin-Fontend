import {API_BASE_URL} from "../config/config";
import {fetchData, fetchDataWithParams} from "../utils/DataAPI";

const DashboardEndpoints = {
    BEST_SELLERS: `${API_BASE_URL}/admin/api/dashboard/get-top3-bestseller`,
    LOW_STOCK: `${API_BASE_URL}/admin/api/dashboard/get-low-stock`,
    LATEST_ORDERS: `${API_BASE_URL}/admin/api/dashboard/get-latest-orders`,
    TOTAL_REVENUE_ORDERS: `${API_BASE_URL}/admin/api/dashboard/total-revenue-orders`,
    SALES_GRAPH: `${API_BASE_URL}/admin/api/dashboard/`,
    TOTAL_AMOUNT: `${API_BASE_URL}/admin/api/dashboard/total-amount`,
};

class DashboardAPI {
    async bestSellers() {
        return fetchData(DashboardEndpoints.BEST_SELLERS,
            "Error fetching best sellers data");
    }

    async findLowStock(stock) {
        return fetchDataWithParams(DashboardEndpoints.LOW_STOCK,{stock},
            "Error fetching low stock data");
    }

    async getLatestOrders() {
        return fetchData(DashboardEndpoints.LATEST_ORDERS,
            "Error fetching latest orders");
    }


    async getTotalRevenueOrders() {
        return fetchData(DashboardEndpoints.TOTAL_REVENUE_ORDERS,
            "Error fetching total revenue orders");
    }

    async getTotalAmount(status, year = null, month = null) {
        return fetchDataWithParams(DashboardEndpoints.TOTAL_AMOUNT, {status, year, month},
        "Error fetching total amount");
    }

    async getSalesGraphByMonth(year) {
        return fetchData(`${DashboardEndpoints.SALES_GRAPH}sales-graph/${year}`,
            "Error fetching sales graph by month");
    }

    async getSalesGraphByYear() {
        return fetchData(`${DashboardEndpoints.SALES_GRAPH}sales-graph-year`,
            "Error fetching sales graph by year");
    }

}

export default new DashboardAPI();
