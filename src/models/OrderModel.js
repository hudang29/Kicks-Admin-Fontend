class OrderModel {
    constructor(id, orderDate, payment, customer, orderStatus, totalAmount) {
        this.id = id;
        this.orderDate = orderDate;
        this.payment = payment;
        this.customer = customer;
        this.orderStatus = orderStatus;
        this.totalAmount = totalAmount;
    }

    static fromJson(json) {
        return new OrderModel(
            json.id,
            json.orderDate,
            json.payment,
            json.customer,
            json.orderStatus,
            json.totalAmount,
        );
    }
}

export default OrderModel;
