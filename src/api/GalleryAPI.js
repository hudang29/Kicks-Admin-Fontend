import GalleryModel from "../models/GalleryModel";
import { API_BASE_URL, axiosInstance } from "../config/config";

const GalleryEndpoints = {
    PRODUCT_GALLERY: `${API_BASE_URL}/staff/api/product-gallery/`,
    PRODUCT_DETAIL_GALLERY: `${API_BASE_URL}/staff/api/product-detail-gallery/`,
    LIST_PRODUCT_DETAIL_GALLERY: `${API_BASE_URL}/staff/api/product-detail-galleries/`,
    ADD_GALLERY: `${API_BASE_URL}/staff/api/add-gallery`
};

class GalleryAPI {
    async getProductGallery(id) {
        return this.fetchDataSingle(
            `${GalleryEndpoints.PRODUCT_GALLERY}${id}`,
            `Error fetching product gallery (ID: ${id})`
        );
    }

    async getProductDetailGallery(id) {
        return this.fetchDataSingle(
            `${GalleryEndpoints.PRODUCT_DETAIL_GALLERY}${id}`,
            `Error fetching product detail gallery (ID: ${id})`
        );
    }

    async getAllProductDetailGallery(id) {
        return this.fetchData(
            `${GalleryEndpoints.LIST_PRODUCT_DETAIL_GALLERY}${id}`,
            `Error fetching all product detail galleries (ID: ${id})`,
            GalleryModel
        );
    }

    async addGallery(galleryDTO) {
        try {
            const response = await axiosInstance.post(GalleryEndpoints.ADD_GALLERY, galleryDTO, {
                headers: { "Content-Type": "application/json" }
            });
            return response.data;
        } catch (error) {
            console.error("Error adding gallery:", error.response?.data || error.message);
            throw error;
        }
    }

    async fetchData(url, errorMessage, Model) {
        try {
            const response = await axiosInstance.get(url);
            return response.data.map(item => Model.fromJson(item));
        } catch (error) {
            console.error(errorMessage, error);
            return [];
        }
    }

    async fetchDataSingle(url, errorMessage) {
        try {
            const response = await axiosInstance.get(url);
            return response.data;
        } catch (error) {
            console.error(errorMessage, error);
            return null;
        }
    }
}

export default new GalleryAPI();
