import axios from "axios";

class UploadImgAPI {
    async uploadFile(file) {
        try {
            // 1️⃣ Tạo formData để gửi file lên Cloudinary
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", "kicks-admin");
            // 2️⃣ Gửi request upload lên Cloudinary
            const response = await axios.post(
                "https://api.cloudinary.com/v1_1/djrbyrhyw/image/upload",
                formData
            );
            console.log("File uploaded:", response.data.secure_url);
            return response.data.secure_url; // Trả về URL ảnh

        } catch (error) {
            console.error("Upload failed:", error);
        }
    }
}
export default new UploadImgAPI();