class ShoesCategoryModel {
    constructor(id, name, genderCategoryID) {
        this.id = id;
        this.name = name;
        this.genderCategoryID = genderCategoryID;
    }

    static fromJson(json) {
        return new ShoesCategoryModel(
            json.id,
            json.name,
            json.genderCategoryID,
        );
    }
}

export default ShoesCategoryModel;