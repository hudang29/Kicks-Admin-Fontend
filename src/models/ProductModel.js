class ProductModel {
    constructor(id, name, categoryID, price, description) {
        this.id = id;
        this.name = name;
        this.categoryID = categoryID;
        this.price = price;
        this.description = description;
    }

    static fromJson(json) {
        return new ProductModel(
            json.id,
            json.name,
            json.categoryID,
            json.price,
            json.description
        );
    }
}

export default ProductModel;