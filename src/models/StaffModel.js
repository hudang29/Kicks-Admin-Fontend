class StaffModel {
    constructor(id, name, email, phone, address, role, status) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.role = role;
        this.status = status;
    }

    static fromJson(json) {
        return new StaffModel(
            json.id,
            json.name,
            json.email,
            json.phone,
            json.address,
            json.role,
            json.status,
        );
    }
}

export default StaffModel;