import {useCallback, useEffect, useState} from "react";
import OrderAPI from "../api/OrderAPI";

function OrdersVM() {
    const [order, setOrder] = useState([]);
    const [orderStatus, setOrderStatus] = useState("");
    const [statuses, setStatuses] = useState([]);


    const fetchOrders = useCallback(async () => {
        try {
            const data = await OrderAPI.getAllByStatus(orderStatus);
            setOrder(data);
        } catch (error) {
            console.error("Lỗi khi lấy danh sách đơn hàng:", error);
        }
    }, [orderStatus]); // useCallback giúp tránh render lại không cần thiết

    const fetchStatuses = useCallback(async () => {
        try {
            const response = await OrderAPI.getOrderStatuses();
            console.log(response.data)
            setStatuses(response.data);
        } catch (error) {
            console.error("Lỗi khi lấy danh sách đơn hàng:", error);
        }
    }, []);
    useEffect(() => {
        document.title = "Orders"; // Cập nhật tiêu đề
        fetchOrders();
    }, [fetchOrders]);

    useEffect(() => {
        fetchStatuses();
    }, [fetchStatuses]);

    const handleFetchDataByStatus = async (status) => {
        setOrderStatus(status);
    }

    const showAllOrder = async() => {
        try {
            const data = await OrderAPI.getAll();
            setOrder(data);
        } catch (error) {
            console.error("Lỗi khi lấy danh sách đơn hàng:", error);
        }
    }

    return {order, statuses, handleFetchDataByStatus, showAllOrder};

}

export default OrdersVM;