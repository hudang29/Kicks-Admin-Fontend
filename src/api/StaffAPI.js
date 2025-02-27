import axios from "axios";
import StaffModel from "../models/StaffModel";

const ShowStaff_API = "http://localhost:8080/api/show-employee";
const CreateStaff_API = "http://localhost:8080/api/create-employee";
const UpdateStaff_API = "http://localhost:8080/api/update-employee";
const ChangeStatusStaff_API = "http://localhost:8080/api/change-status-employee";

class StaffAPI {
    async getAll() {
        const staffs = await axios.get(ShowStaff_API);
        return staffs.data.map((staff) => StaffModel.fromJson(staff));
    }

    async getById(id) {
        const staff = await axios.get(`${ShowStaff_API}/${id}`);
        return StaffModel.fromJson(staff.data);
    }

    async create(data) {
        try {
            const response = await axios.post(`${CreateStaff_API}`, data, {
                headers: {
                    "Content-Type": "application/json",
                }
            });
            console.log("✅ Phản hồi từ server:", response.data);
            return response.data;
        } catch (error) {
            console.error("Lỗi khi thêm mới nhân viên:", error.response?.data || error.message);
        }
    }

    async update(data) {
        try {
            const response = await axios.put(`${UpdateStaff_API}`, data, {
                headers: {
                    "Content-Type": "application/json",
                }
            })
            console.log("✅ Phản hồi từ server:", response.data);
            return response.data;
        } catch (error) {
            console.error("Lỗi khi cập nhập thông tin nhân viên:", error.response?.data || error.message);
        }
    }

    async changeStatus(data) {
        try {
            const response = await axios.put(`${ChangeStatusStaff_API}`, data, {
                headers: {
                    "Content-Type": "application/json",
                }
            })
            console.log("✅ Phản hồi từ server:", response.data);
            return response.data;
        } catch (error) {
            console.error("Lỗi khi thay đổi trạng thái nhân viên:", error.response?.data || error.message);
        }
    }

}

export default new StaffAPI();