import {useCallback, useEffect, useState} from "react";
import DashboardAPI from "../api/DashboardAPI";
import {stopLoadingWithDelay} from "../utils/Util";

function DashboardVM() {

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    const [loading, setLoading] = useState(false);

    const [bestSellers, setBestSellers] = useState([]);
    const [lowStock, setLowStock] = useState([]);
    const [latestOrders, setLatestOrders] = useState([]);
    const [stock, setStock] = useState();
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [totalOrders, setTotalOrders] = useState(0);
    const [totalCancelled, setTotalCancelled] = useState(0);


    // 🛠️ Hàm fetch dữ liệu sản phẩm tồn kho thấp
    const handleFindLowStock = useCallback(async (stockSubmit) => {
        try {
            setStock(stockSubmit);
            const response = await DashboardAPI.findLowStock(stockSubmit);
            setLowStock(Array.isArray(response) ? response : []);
        } catch (error) {
            console.error("Lỗi load lại low stock", error);
        }
    }, []);

    // 🛠️ Tối ưu hóa việc gọi API
    useEffect(() => {
        const fetchDashboardData = async () => {
            setLoading(true);
            try {
                // Gọi API song song để tăng tốc
                const [
                    bestSellersRes,
                    lowStockRes,
                    totalAmountCompleted,
                    totalOrdersRes,
                    latestOrdersRes,
                    totalAmountCancelled,
                ] = await Promise.all([
                    DashboardAPI.bestSellers(),
                    DashboardAPI.findLowStock(),
                    DashboardAPI.getTotalAmount("COMPLETED", currentYear, currentMonth),
                    DashboardAPI.getTotalRevenueOrders(),
                    DashboardAPI.getLatestOrders(),
                    DashboardAPI.getTotalAmount("CANCELLED", currentYear, currentMonth)
                ]);

                // Cập nhật state
                setBestSellers(Array.isArray(bestSellersRes) ? bestSellersRes : []);
                setLowStock(Array.isArray(lowStockRes) ? lowStockRes : []);
                setTotalRevenue(totalAmountCompleted ?? 0);
                setTotalOrders(totalOrdersRes ?? 0);
                setLatestOrders(Array.isArray(latestOrdersRes) ? latestOrdersRes : []);
                setTotalCancelled(totalAmountCancelled ?? 0);
            } catch (error) {
                console.error("Lỗi khi tải dữ liệu bảng điều khiển:", error);
            } finally {
                stopLoadingWithDelay(setLoading)
            }
        };

        fetchDashboardData();
    }, [currentMonth, currentYear]);

    return {
        loading,
        setStock, stock, totalRevenue, totalOrders, latestOrders, totalCancelled,
        bestSellers, lowStock, handleFindLowStock,
    }
}

export default DashboardVM;