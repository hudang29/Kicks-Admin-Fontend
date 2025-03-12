import SizeModel from "../models/SizeModel";
import SizeSampleModel from "../models/SizeSampleModel";
import {axiosInstance} from "../utils/Util";

const ShowSize_API = "http://localhost:8080/staff/api/sizes/";
const ShowSizeSample_API = "http://localhost:8080/staff/api/size-sample";

const UpdateSize_API = "http://localhost:8080/staff/api/sizes/update";
const CreateSize_API = "http://localhost:8080/staff/api/sizes/create";


class SizeAPI {
    async getAll(id) {
        const sizes = await axiosInstance.get(ShowSize_API + id);
        return sizes.data.map((size) => SizeModel.fromJson(size));
    }

    async getAllSample() {
        const sizes = await axiosInstance.get(ShowSizeSample_API);
        return sizes.data.map((size) => SizeSampleModel.fromJson(size));
    }

    async create(sizeData) {
        try {
            const response = await axiosInstance.post(
                `${ShowSizeSample_API}-create`, sizeData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    }
                }
            );
            //console.log("Kết quả từ API:", response.data);
            return response.data;
        } catch (error) {
            console.error("Lỗi khi tạo size:", error.response?.data || error.message);
            throw error;
        }
    }

    async delete(id) {
        try {
            const response = await axiosInstance.delete(`${ShowSizeSample_API}-delete/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                },
                // timeout: 5000, // Giới hạn request trong 5 giây
            });

            //console.log("Xóa thành công:", response.data);
            return response.data; // Trả về dữ liệu phản hồi từ API
        } catch (error) {
            console.error("Lỗi khi xóa size:", error.response?.data || error.message);
            throw error; // Ném lỗi để xử lý trong component
        }
    }

    async update(sizeData, productDetailId) {
        try {
            const response = await axiosInstance.put(`${UpdateSize_API}/${productDetailId}`, sizeData, {
                headers: {
                    "Content-Type": "application/json",
                }
            });
            return response.data;
        } catch (error) {
            console.error("Lỗi", error.response?.data || error.message);
            throw error;
        }
    }

    async createSizeList(sizeData, productDetailId) {
        try {
            const response = await axiosInstance.post(`${CreateSize_API}/${productDetailId}`, sizeData, {
                headers: {
                    "Content-Type": "application/json",
                }
            });
            return response.data;
        } catch (error) {
            console.error("Lỗi", error.response?.data || error.message);
            throw error;
        }
    }
}

export default new SizeAPI();