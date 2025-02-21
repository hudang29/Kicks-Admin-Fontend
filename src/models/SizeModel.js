class SizeModel {
    constructor(id, size, stock) {
        this.id = id;
        this.size = size;
        this.stock = stock;
    }

    static fromJson(json) {
        return new SizeModel(
            json.id,
            json.size,
            json.stock
        );
    }
}

export default SizeModel;