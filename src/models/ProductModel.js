class ProductModel {
    constructor(id, name, shoesCategoryID, brand, price, description, supplierID, genderCategoryID, page) {
        this.id = id;
        this.name = name;
        this.shoesCategoryID = shoesCategoryID;
        this.brand = brand;
        this.price = price;
        this.description = description;
        this.supplierID = supplierID;
        this.genderCategoryID = genderCategoryID;
    }

    static fromJson(json) {
        return new ProductModel(
            json.id,
            json.name,
            json.shoesCategoryID,
            json.brand,
            json.price,
            json.description,
            json.supplierID,
            json.genderCategoryID,
        );
    }
}

export default ProductModel;