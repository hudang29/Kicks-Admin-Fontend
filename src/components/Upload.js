import { useState } from "react";
import axios from "axios";

const UploadImage = () => {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [uploadedUrl, setUploadedUrl] = useState("");

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setImage(file);
        setPreview(URL.createObjectURL(file));
    };

    const handleUpload = async () => {
        if (!image) {
            alert("Vui lòng chọn một ảnh!");
            return;
        }

        const formData = new FormData();
        formData.append("file", image);

        try {
            // Upload ảnh lên Cloudinary trực tiếp từ Frontend
            const cloudinaryResponse = await axios.post(
                `https://api.cloudinary.com/v1_1/<CLOUD_NAME>/image/upload`,
                formData
            );

            const imageUrl = cloudinaryResponse.data.secure_url; // URL ảnh trên Cloudinary

            // Tách tên file từ URL
            const fileName = imageUrl.split("/").pop(); // Lấy phần cuối của URL làm tên file

            // Gửi URL và tên file về Backend để lưu vào database
            const backendResponse = await axios.post("http://localhost:8080/api/save-image", {
                fileName,
                url: imageUrl,
            });

            setUploadedUrl(backendResponse.data.url);
        } catch (error) {
            console.error("Lỗi upload ảnh:", error);
            alert("Upload thất bại!");
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            {preview && <img src={preview} alt="Preview" style={{ width: "200px", marginTop: "10px" }} />}
            <button onClick={handleUpload}>Upload</button>

            {uploadedUrl && (
                <div>
                    <p>Ảnh đã upload:</p>
                    <img src={uploadedUrl} alt="Uploaded" style={{ width: "200px" }} />
                    <p>URL: <a href={uploadedUrl} target="_blank" rel="noopener noreferrer">{uploadedUrl}</a></p>
                </div>
            )}
        </div>
    );
};

export default UploadImage;
