import StaffModel from "../models/StaffModel";
import {API_BASE_URL, axiosInstance} from "../config/config";

const ShowStaff_API = `${API_BASE_URL}/manager/api/show-employee`;
const CheckPassword_API = `${API_BASE_URL}/manager/api/check-exists-password`;
const CreateStaff_API = `${API_BASE_URL}/manager/api/create-employee`;
const UpdateStaff_API = `${API_BASE_URL}/manager/api/update-employee`;
const ChangeStatusStaff_API = `${API_BASE_URL}/manager/api/change-status-employee`;
const CreatePassword_API = `${API_BASE_URL}/manager/api/create-password`;

class StaffAPI {
    async getAll() {
        const staffs = await axiosInstance.get(ShowStaff_API);
        return staffs.data.map((staff) => StaffModel.fromJson(staff));
    }

    async getById(id) {
        const staff = await axiosInstance.get(`${ShowStaff_API}/${id}`);
        return StaffModel.fromJson(staff.data);
    }

    async checkPasswordExists(id) {
        try {
            const response = await axiosInstance.get(`${CheckPassword_API}/${id}`);
            return response.data;
        } catch (error) {
            console.error("Error fetching password existence:", error);
            return false;
        }
    }

    async create(data) {
        try {
            const response = await axiosInstance.post(`${CreateStaff_API}`, data, {
                headers: {
                    "Content-Type": "application/json",
                }
            });
            console.log("✅ create new staff:", response.data);
            return response.data;
        } catch (error) {
            console.error("Lỗi khi thêm mới nhân viên:", error.response?.data || error.message);
        }
    }

    async update(data) {
        try {
            const response = await axiosInstance.put(`${UpdateStaff_API}`, data, {
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
            const response = await axiosInstance.put(`${ChangeStatusStaff_API}`, data, {
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

    async createPassword(data) {
        try {
            const response = await axiosInstance.post(`${CreatePassword_API}`, data, {
                headers: {
                    "Content-Type": "application/json",
                }
            })
            console.log("✅ Phản hồi từ server:", response.data);
            return response.data;
        } catch (error) {
            console.error("Lỗi tạo password", error.response?.data || error.message);
        }
    }

}

export default new StaffAPI();