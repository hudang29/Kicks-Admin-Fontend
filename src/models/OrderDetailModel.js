class OrderDetailModel {
    constructor(orderDetailID, productDetailID, productName, productImage, size, color, quantity, price) {
        this.orderDetailID = orderDetailID;
        this.productDetailID = productDetailID;
        this.productName = productName;
        this.productImage = productImage;
        this.size = size;
        this.color = color;
        this.quantity = quantity;
        this.price = price;
    }

    static fromJson(json) {
        return new OrderDetailModel(
            json.orderDetailID,
            json.productDetailID,
            json.productName,
            json.productImage,
            json.size,
            json.color,
            json.quantity,
            json.price,
        );
    }
}

export default OrderDetailModel;
