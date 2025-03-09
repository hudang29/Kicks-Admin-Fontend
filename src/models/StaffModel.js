class StaffModel {
    constructor(id, name, email, phone, address, role, status, createAt, city, district, ward) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.role = role;
        this.status = status;
        this.createAt = createAt;
        this.city = city;
        this.district = district;
        this.ward = ward;
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
            json.createAt,
            json.city,
            json.district,
            json.ward,
        );
    }
}

export default StaffModel;