class GenderCategoryModel {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }

    static fromJson(json) {
        return new GenderCategoryModel(
            json.id,
            json.name,
        );
    }
}

export default GenderCategoryModel;