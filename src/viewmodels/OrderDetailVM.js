import {useCallback, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import OrderDetailModel from "../models/OrderDetailModel";
import OrderDetailAPI from "../api/OrderDetailAPI";
import {stopLoadingWithDelay} from "../utils/Util";
import OrderModel from "../models/OrderModel";

function OrderDetailVM() {
    const [loading, setLoading] = useState(false);
    const {orderId} = useParams();
    const [orderDetail, setOrderDetail] = useState([]);
    const [orders, setOrders] = useState(new OrderModel(
        "","","", "","","","","","",
    ));

    const fetchOrderDetail = useCallback(async () => {
        setLoading(true);
        try {
            const response = await OrderDetailAPI.getOrderDetails(orderId);
            const orderDetails = response.map(
                (item) =>
                    new OrderDetailModel(
                        item.orderDetailID,
                        item.productDetailID,
                        item.productName,
                        item.productImage,
                        item.size,
                        item.color,
                        item.quantity,
                        item.price
                    )
            );

            console.log(orderDetails);
            setOrderDetail(orderDetails);
        } catch (e) {
            console.error("Error fetching order details:", e);
        } finally {
            stopLoadingWithDelay(setLoading);
        }
    }, [orderId]);

    useEffect(() => {
        fetchOrderDetail();
    }, [fetchOrderDetail]);



    return {
        loading, orderDetail
    };
}

export default OrderDetailVM;
