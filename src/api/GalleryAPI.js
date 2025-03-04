import axios from "axios";
import GalleryModel from "../models/GalleryModel";

const ShowProductGallery_API = "http://localhost:8080/api/product-gallery";
const ShowProductDetailGallery_API = "http://localhost:8080/api/product-detail-gallery";
const ShowListProductDetailGallery_API = "http://localhost:8080/api/product-detail-galleries";
const AddGallery_API = "http://localhost:8080/api/add-gallery";

class GalleryAPI {
    async getProductGallery(id) {
        const response = await axios.get(`${ShowProductGallery_API}/${id}`);
        return response.data;
    }

    async getProductDetailGallery(id) {
        const response = await axios.get(`${ShowProductDetailGallery_API}/${id}`);
        return response.data;
    }

    async getAllProductDetailGallery(id) {
        const response = await axios.get(`${ShowListProductDetailGallery_API}/${id}`);
        return response.data.map((response) => GalleryModel.fromJson(response));
    }

    async addGallery(galleryData) {
        try {
            const response = await axios.post(`${AddGallery_API}`,galleryData,{
                headers:{
                    "Content-Type": "application/json"
                }
            })
            return response.data;
        } catch (error) {
            console.error("Lỗi khi thêm ảnh:", error.response?.data || error.message);
            throw error;
        }
    }

}

export default new GalleryAPI();