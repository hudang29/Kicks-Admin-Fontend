import {useEffect, useState} from "react";
import OrderAPI from "../api/OrderAPI";

function OrdersVM() {
    const [order, setOrder] = useState([]);
    const [orderStatus, setOrderStatus] = useState("");

    useEffect(() => {
        document.title = "Orders"; // Cập nhật tiêu đề

        const fetchOrders = async () => {
            try {
                const data = await OrderAPI.getAllByStatus(orderStatus);
                setOrder(data);
            } catch (error) {
                console.error("Lỗi khi lấy danh sách đơn hàng:", error);
            }
        };

        fetchOrders();
    }, [orderStatus]);

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

    return {order, handleFetchDataByStatus, showAllOrder};

}

export default OrdersVM;