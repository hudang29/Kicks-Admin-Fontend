class StaffModel {
    constructor(id, name, email, role, status) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
        this.status = status;
    }

    static fromJson(json) {
        return new StaffModel(
            json.id,
            json.name,
            json.email,
            json.role,
            json.status,
        );
    }
}

export default StaffModel;