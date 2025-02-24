import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import ProductDetailAPI from "../api/ProductDetailAPI";
import ProductAPI from "../api/ProductAPI";

function ProductDetailVM() {
    const {id} = useParams();

    const [productDetail, setProductDetail,] = useState([]); // State lưu danh sách
    const [product, setProduct] = useState(null); // State lưu danh sách

    useEffect(() => {
        if (!id) return; // Bảo vệ khi id chưa có

        const fetchProductData = async () => {
            try {
                const productDetailData = await ProductDetailAPI.getAll(id);
                setProductDetail(productDetailData);

                const productData = await ProductAPI.getProductById(id);
                setProduct(productData);
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu sản phẩm:", error);
            }
        };

        fetchProductData();
    }, [id]); // ✅ Thêm `id` vào dependency


    return {
        productDetail,
        product
    }
}

export default ProductDetailVM;