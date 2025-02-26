import {useEffect, useState} from "react";
import OrderAPI from "../api/OrderAPI";

function OrdersVM() {
    const [order, setOrder] = useState([]);

    useEffect(() => {
        document.title = "Orders"; // Cập nhật tiêu đề

        const fetchOrders = async () => {
            try {
                const data = await OrderAPI.getAll();
                setOrder(data);
            } catch (error) {
                console.error("Lỗi khi lấy danh sách đơn hàng:", error);
            }
        };

        fetchOrders();
    }, []);

    return {order};

}

export default OrdersVM;