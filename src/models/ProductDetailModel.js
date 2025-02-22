class ProductDetailModel {
    constructor(id, productId, name, color, discountId) {
        this.id = id;
        this.productId = productId;
        this.name = name;
        this.color = color;
        this.discountId = discountId;
    }

    static fromJson(json) {
        return new ProductDetailModel(
            json.id,
            json.productId,
            json.name,
            json.color,
            json.discountId,
        );
    }
}

export default ProductDetailModel;