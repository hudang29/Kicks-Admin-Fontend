import {useCallback, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import OrderDetailModel from "../models/OrderDetailModel";
import OrderDetailAPI from "../api/OrderDetailAPI";

function OrderDetailVM() {
    const {orderId} = useParams();
    const [orderDetail, setOrderDetail] = useState([]);

    const fetchOrderDetail = useCallback(async () => {
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
        }
    }, [orderId]);

    useEffect(() => {
        fetchOrderDetail();
    }, [fetchOrderDetail]);

    return {orderDetail};
}

export default OrderDetailVM;
