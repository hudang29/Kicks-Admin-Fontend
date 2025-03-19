class SizeModel {
    constructor(id, productDetailId, size, stock) {
        this.id = id;
        this.productDetailId = productDetailId;
        this.size = size;
        this.stock = stock;
    }

    static fromJson(json) {
        return new SizeModel(
            json.id,
            json.productDetailId,
            json.size,
            json.stock
        );
    }
}

export default SizeModel;