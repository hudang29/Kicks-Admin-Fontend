import {useCallback, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import OrderAPI from "../api/OrderAPI";
import OrderModel from "../models/OrderModel";
import {stopLoadingWithDelay} from "../utils/Util";

function OrdersVM() {
    const {orderId} = useParams();
    const [loading, setLoading] = useState(false);


    const [orderList, setOrderList] = useState([]);
    const [orderStatus, setOrderStatus] = useState("");
    const [statuses, setStatuses] = useState([]);
    const [order, setOrder] = useState(
        new OrderModel(
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "",
            "")
    );

    // Fetch danh sách đơn hàng theo trạng thái
    const fetchOrders = useCallback(async () => {
        setLoading(true);
        try {
            const data = await OrderAPI.getAllByStatus(orderStatus);
            setOrderList(data);
        } catch (error) {
            console.error("Error fetching orders:", error);
        } finally {
            stopLoadingWithDelay(setLoading)
        }
    }, [orderStatus]);

    // Fetch danh sách trạng thái đơn hàng
    const fetchStatuses = useCallback(async () => {
        setLoading(true);
        try {
            const response = await OrderAPI.getOrderStatuses();
            //console.log(response);
            setStatuses(response);
        } catch (error) {
            console.error("Error fetching order statuses:", error);
        } finally {
            stopLoadingWithDelay(setLoading)
        }
    }, []);

    // Fetch chi tiết đơn hàng theo orderId
    const fetchOrder = useCallback(async () => {
        if (!orderId) return;
        try {
            const response = await OrderAPI.getById(orderId);
            setOrder(new OrderModel(
                response.id,
                response.couponId,
                response.orderDate,
                response.payment,
                response.customer,
                response.phone,
                response.orderStatus,
                response.totalAmount,
                response.shippingAddress
            ));
        } catch (error) {
            console.error("Error fetching order details:", error);
        }
    }, [orderId]);

    // Gọi API khi component mount hoặc khi dependencies thay đổi
    useEffect(() => {
        document.title = "Orders";
        fetchOrders();
    }, [fetchOrders]);

    useEffect(() => {
        fetchStatuses();
    }, [fetchStatuses]);

    useEffect(() => {
        fetchOrder();
    }, [fetchOrder]);

    // Lọc đơn hàng theo trạng thái
    const handleFetchDataByStatus = (status) => {
            setOrderStatus(status);
    };

    // Lấy tất cả đơn hàng
    const showAllOrder = async () => {
        setLoading(true);
        try {
            const data = await OrderAPI.getAll();
            setOrderList(data);
        } catch (error) {
            console.error("Error fetching all orders:", error);
        } finally {
            stopLoadingWithDelay(setLoading)
        }
    };

    return {orderList, order, statuses, loading,
        handleFetchDataByStatus, showAllOrder};
}

export default OrdersVM;
