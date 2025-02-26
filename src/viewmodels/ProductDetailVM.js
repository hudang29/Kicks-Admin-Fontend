import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import ProductDetailAPI from "../api/ProductDetailAPI";
import ProductAPI from "../api/ProductAPI";

function ProductDetailVM() {
    const {id} = useParams();

    const [productDetail, setProductDetail,] = useState([]);
    const [product, setProduct] = useState(null);
    const [newColor, setNewColor] = useState(null);

    useEffect(() => {
        document.title = "Product Detail";
    }, []);

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

    const handleAddColor = async () => {
        if (!newColor.trim()) {
            alert("Vui lòng nhập màu!");
            return;
        }

        try {
            const newProductDetail = {
                color: newColor,
                productId: id,
            };

            const response = await ProductDetailAPI.createProductDetail(newProductDetail);
            console.log(newProductDetail);
            console.log(response);
            // Cập nhật danh sách `productDetail`
            setProductDetail((prev) => [...prev, response]);

            // Reset input
            setNewColor(null);
            alert("thêm thành công ");

        } catch (error) {
            console.error("Lỗi khi thêm màu mới:", error);
            alert("thêm thất bại ");
        }
    };

    return {
        productDetail,
        product,
        newColor,
        setNewColor,
        handleAddColor
    }
}

export default ProductDetailVM;