class GalleryModel {
    constructor (id, image, productDetailID, isDefault) {
        this.id = id;
        this.image = image;
        this.productDetailID = productDetailID;
        this.isDefault = isDefault;
    }
    static fromJson(json) {
        return new GalleryModel(
            json.id,
            json.image,
            json.productDetailID,
            json.isDefault,
        );
    }
}
export default GalleryModel;