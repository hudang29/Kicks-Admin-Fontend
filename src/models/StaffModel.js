class StaffModel {
    constructor(id, name, email, phone, address, role, status, createAt) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.role = role;
        this.status = status;
        this.createAt = createAt;
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
            json.createAt
        );
    }
}

export default StaffModel;