class SupplierModel {
    constructor(id, name, address, contactInfo) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.contactInfo = contactInfo;
    }
    static fromJson(json) {
        return new SupplierModel(
            json.id,
            json.name,
            json.address,
            json.contactInfo,
        );
    }
}

export default SupplierModel;