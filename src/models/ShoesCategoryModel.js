class ShoesCategoryModel {
    constructor(id, name, GenderCategoryID) {
        this.id = id;
        this.name = name;
        this.GenderCategoryID = GenderCategoryID;
    }

    static fromJson(json) {
        return new ShoesCategoryModel(
            json.id,
            json.name,
            json.GenderCategoryID,
        );
    }
}

export default ShoesCategoryModel;