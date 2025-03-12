import GalleryModel from "../models/GalleryModel";
import {axiosInstance} from "../utils/Util";

const ShowProductGallery_API = "http://localhost:8080/staff/api/product-gallery";
const ShowProductDetailGallery_API = "http://localhost:8080/staff/api/product-detail-gallery";
const ShowListProductDetailGallery_API = "http://localhost:8080/staff/api/product-detail-galleries";
const AddGallery_API = "http://localhost:8080/staff/api/add-gallery";

class GalleryAPI {
    async getProductGallery(id) {
        try {
            const response = await axiosInstance.get(`${ShowProductGallery_API}/${id}`);
            return response.data;
        } catch (e) {
            console.log(e);
        }
    }

    async getProductDetailGallery(id) {
        try {
            const response = await axiosInstance.get(`${ShowProductDetailGallery_API}/${id}`);
            return response.data;
        } catch (e) {
            console.log(e);
        }

    }

    async getAllProductDetailGallery(id) {
        try {
            const response = await axiosInstance.get(`${ShowListProductDetailGallery_API}/${id}`);
            return response.data.map((response) => GalleryModel.fromJson(response));
        } catch (e) {
            console.log(e);
        }
    }

    async addGallery(galleryDTO) {
        try {
            const response = await axiosInstance.post(`${AddGallery_API}`, galleryDTO, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            return response.data;
        } catch (error) {
            console.error("Lỗi khi thêm ảnh:", error.response?.data || error.message);
            throw error;
        }
    }

}

export default new GalleryAPI();