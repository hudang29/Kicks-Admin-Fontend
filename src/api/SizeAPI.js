import axios from "axios";
import SizeModel from "../models/SizeModel";
import SizeSampleModel from "../models/SizeSampleModel";

const ShowSize_API = "http://localhost:8080/api/sizes/";
const ShowSizeSample_API = "http://localhost:8080/api/size-sample";

class SizeAPI {
    async getAll(id) {
        const sizes = await axios.get(ShowSize_API + id);
        return sizes.data.map((size) => SizeModel.fromJson(size));
    }

    async getAllSample() {
        const sizes = await axios.get(ShowSizeSample_API);
        return sizes.data.map((size) => SizeSampleModel.fromJson(size));
    }

    async create(sizeData) {
        try {
            const response = await axios.post(
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
            const response = await axios.delete(`${ShowSizeSample_API}-delete/${id}`, {
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
}

export default new SizeAPI();