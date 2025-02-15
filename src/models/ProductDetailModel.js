class ProductDetailModel {
    constructor(id, name, color, discountId) {
        this.id = id;
        this.name = name;
        this.color = color;
        this.discountId = discountId;
    }

    static fromJson(json) {
        return new ProductDetailModel(
            json.id,
            json.name,
            json.color,
            json.discountId,
        );
    }
}

export default ProductDetailModel;