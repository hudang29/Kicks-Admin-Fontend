import {useEffect, useState} from "react";
import DashboardAPI from "../api/DashboardAPI";

function DashboardVM() {
    const [bestSellers, setBestSellers] = useState([]);
    const [lowStock, setLowStock] = useState([]);
    const [latestOrders, setLatestOrders] = useState([]);
    const [stock, setStock] = useState();
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [totalOrders, setTotalOrders] = useState(0);

    const handleFindLowStock = async (stockSubmit) => {
        try {
            setStock(stockSubmit);
            console.log(stock);
            const response = await DashboardAPI.findLowStock(stockSubmit);
            console.log(response);
            setLowStock(response);
        } catch (error) {
            console.error("Lỗi load lại low stock",error);
        }

    }

    useEffect(() => {
        const fetchBestSellerData = async () => {
            const response = await DashboardAPI.bestSellers();
            setBestSellers(response);
        }
        const fetchLowStock = async () => {
            const response = await DashboardAPI.findLowStock();
            setLowStock(response);
        }
        const fetchTotalRevenue = async () => {
            const response = await DashboardAPI.getTotalRevenue()
            setTotalRevenue(response);
        }
        const fetchTotalRevenueOrders = async () => {
            const response = await DashboardAPI.getTotalRevenueOrders()
            setTotalOrders(response);
        }
        const fetchLatestOrders = async () => {
            const response = await DashboardAPI.getLatestOrders()
            setLatestOrders(response);
        }
        fetchTotalRevenue();
        fetchTotalRevenueOrders();
        fetchBestSellerData();
        fetchLowStock();
        fetchLatestOrders();
    }, []);

    return {
        setStock, stock, totalRevenue, totalOrders, latestOrders,
        bestSellers, lowStock, handleFindLowStock,
    }
}

export default DashboardVM;