class CategoryModel {
    constructor(id, name, parentID) {
        this.id = id;
        this.name = name;
        this.parentID = parentID;
    }

    static fromJson(json) {
        return new CategoryModel(
            json.id,
            json.name,
            json.parentID,
        );
    }
}

export default CategoryModel;