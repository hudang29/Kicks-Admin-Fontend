class SizeSampleModel {
    constructor(id, size) {
        this.id = id;
        this.size = size;
    }

    static fromJson(json) {
        return new SizeSampleModel(
            json.id,
            json.size
        );
    }
}

export default SizeSampleModel;