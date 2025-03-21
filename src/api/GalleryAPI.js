import GalleryModel from "../models/GalleryModel";
import { API_BASE_URL} from "../config/config";
import {fetchData, fetchDataSingle, sendData} from "../utils/DataAPI";

const GalleryEndpoints = {
    PRODUCT_GALLERY: `${API_BASE_URL}/staff/api/product-gallery/`,
    PRODUCT_DETAIL_GALLERY: `${API_BASE_URL}/staff/api/product-detail-gallery/`,
    LIST_PRODUCT_DETAIL_GALLERY: `${API_BASE_URL}/staff/api/product-detail-galleries/`,
    ADD_GALLERY: `${API_BASE_URL}/staff/api/add-gallery`
};

class GalleryAPI {
    async getProductGallery(id) {
        return fetchDataSingle(
            `${GalleryEndpoints.PRODUCT_GALLERY}${id}`,
            `Error fetching product gallery (ID: ${id})`
        );
    }

    async getProductDetailGallery(id) {
        return fetchDataSingle(
            `${GalleryEndpoints.PRODUCT_DETAIL_GALLERY}${id}`,
            `Error fetching product detail gallery (ID: ${id})`
        );
    }

    async getAllProductDetailGallery(id) {
        return fetchData(
            `${GalleryEndpoints.LIST_PRODUCT_DETAIL_GALLERY}${id}`,
            `Error fetching all product detail galleries (ID: ${id})`,
            GalleryModel
        );
    }

    async addGallery(galleryDTO) {
        return sendData(
            GalleryEndpoints.ADD_GALLERY,
            galleryDTO,
            "Error adding gallery:",
            "POST"
        )
    }
}

export default new GalleryAPI();
