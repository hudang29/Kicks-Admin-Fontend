class ProductDetailModel {
    constructor(id, productId, color, discountId, isDefault) {
        this.id = id;
        this.productId = productId;
        this.color = color;
        this.discountId = discountId;
        this.isDefault = isDefault;
    }

    static fromJson(json) {
        return new ProductDetailModel(
            json.id,
            json.productId,
            json.color,
            json.discountId,
            json.isDefault
        );
    }
}

export default ProductDetailModel;