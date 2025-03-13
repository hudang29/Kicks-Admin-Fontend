class OrderModel {
    constructor(id, couponId = null, orderDate, payment, customer, phone,
                orderStatus, totalAmount, shippingAddress = null) {
        this.id = id;
        this.couponId = couponId;
        this.orderDate = orderDate;
        this.payment = payment;
        this.customer = customer;
        this.phone = phone;
        this.orderStatus = orderStatus;
        this.totalAmount = totalAmount;
        this.shippingAddress = shippingAddress;
    }

    static fromJson(json) {
        return new OrderModel(
            json.id,
            json.couponId,
            json.orderDate,
            json.payment,
            json.customer,
            json.phone,
            json.orderStatus,
            json.totalAmount,
            json.shippingAddress,
        );
    }
}

export default OrderModel;
