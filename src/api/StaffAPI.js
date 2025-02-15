import axios from "axios";
import StaffModel from "../models/StaffModel";

const ShowStaff_API = "http://localhost:8080/api/show-employee";

class StaffAPI {
    async getAll() {
        const staffs = await axios.get(ShowStaff_API);
        return staffs.data.map((staff) => StaffModel.fromJson(staff));
    }
}
export default new StaffAPI();