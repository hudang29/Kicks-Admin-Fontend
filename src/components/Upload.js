import {useState} from "react";
import UploadImgAPI from "../api/UploadImgAPI";
import GalleryAPI from "../api/GalleryAPI";

function Upload({id}) {
    const [file, setFile] = useState(null);
    const [imageUrl, setImageUrl] = useState("");

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) return alert("Vui lòng chọn file!");

        // 1️⃣ Upload lên Cloudinary
        const url = await UploadImgAPI.uploadFile(file);
        setImageUrl(url); // Hiển thị ảnh

        const newGallery = {
            image: url,
            productDetailID: id
        }

        console.log(newGallery);
        GalleryAPI.addGallery(newGallery)
            .catch(error => console.log("Lỗi",error));

        alert("Lưu ảnh thành công!");
    };

    return (
        <>
            <div className="mb-3">
                <input type="file" onChange={handleFileChange}/>
                <button className="btn btn-kicks" onClick={handleUpload}>Upload</button>
            </div>
            <label className="form-label">New Gallery</label>
            <div className="mb-3 row row-cols-4">
                <div className="col-md-3 col-lg-3 col-6 kicks-img" key={imageUrl}>
                    <img src={imageUrl} className="img-fluid"
                         alt={imageUrl}/>
                </div>
            </div>
        </>

    );
}

export default Upload;
