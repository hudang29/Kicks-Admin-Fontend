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
            const response = await DashboardAPI.findLowStock(stockSubmit);
            console.log(response);
            if (Array.isArray(response)) {
                setLowStock(response);
            } else {
                setLowStock([]);
            }
        } catch (error) {
            console.error("Lỗi load lại low stock",error);
        }

    }

    useEffect(() => {
        const fetchBestSellerData = async () => {
            const response = await DashboardAPI.bestSellers();
            if (Array.isArray(response)) {
                setBestSellers(response);
            } else {
                setBestSellers([]);
            }
        }
        const fetchLowStock = async () => {
            const response = await DashboardAPI.findLowStock();
            if (Array.isArray(response)) {
                setLowStock(response);
            } else {
                setLowStock([]);
            }
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
            if (Array.isArray(response)) {
                setLatestOrders(response);
            } else {
                setLatestOrders([]);
            }
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