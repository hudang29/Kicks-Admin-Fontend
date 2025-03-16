import {useCallback, useEffect, useState} from "react";
import DashboardAPI from "../api/DashboardAPI";
import {stopLoadingWithDelay} from "../utils/Util";

function DashboardVM() {

    const [loading, setLoading] = useState(false);

    const [bestSellers, setBestSellers] = useState([]);
    const [lowStock, setLowStock] = useState([]);
    const [latestOrders, setLatestOrders] = useState([]);
    const [stock, setStock] = useState();
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [totalOrders, setTotalOrders] = useState(0);


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
                    totalRevenueRes,
                    totalOrdersRes,
                    latestOrdersRes
                ] = await Promise.all([
                    DashboardAPI.bestSellers(),
                    DashboardAPI.findLowStock(),
                    DashboardAPI.getTotalRevenue(),
                    DashboardAPI.getTotalRevenueOrders(),
                    DashboardAPI.getLatestOrders()
                ]);

                // Cập nhật state
                setBestSellers(Array.isArray(bestSellersRes) ? bestSellersRes : []);
                setLowStock(Array.isArray(lowStockRes) ? lowStockRes : []);
                setTotalRevenue(totalRevenueRes ?? 0);
                setTotalOrders(totalOrdersRes ?? 0);
                setLatestOrders(Array.isArray(latestOrdersRes) ? latestOrdersRes : []);

            } catch (error) {
                console.error("Lỗi khi tải dữ liệu bảng điều khiển:", error);
            } finally {
                stopLoadingWithDelay(setLoading)
            }
        };

        fetchDashboardData();
    }, []);

    return {
        loading,
        setStock, stock, totalRevenue, totalOrders, latestOrders,
        bestSellers, lowStock, handleFindLowStock,
    }
}

export default DashboardVM;