import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import ProductDetailAPI from "../api/ProductDetailAPI";
import ProductAPI from "../api/ProductAPI";
import CategoryAPI from "../api/CategoryAPI";

function ProductDetailVM() {
    const {id} = useParams();

    const [productDetail, setProductDetail,] = useState([]);
    const [product, setProduct] = useState({});
    const [newColor, setNewColor] = useState(null);
    const [gender, setGender] = useState({});
    const [type, setType] = useState({});
    const [reload, setReload] = useState(false);

    useEffect(() => {
        document.title = "Shoes Detail";
        if (!id) return;

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
    }, [id, reload]);

    useEffect(() => {
        if (product) {
            CategoryAPI.getShoesCategoryById(product.shoesCategoryID)
                .then((data) => setType(data))
                .catch((error) => console.error("Lỗi", error));
            CategoryAPI.getGenderCategoryById(product.genderCategoryID)
                .then((data) => setGender(data))
                .catch((error) => console.log("error", error));
        }
    }, [product]);

    const handleAddColor = async () => {
        if (!newColor.trim()) {
            alert("Enter new color Please!");
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
            // Đổi trạng thái reload để kích hoạt useEffect
            setReload(prev => !prev);
            // Reset input
            setNewColor("");
            alert("Successfully add color");
        } catch (error) {
            console.error("Lỗi khi thêm màu mới:", error);
            alert("Failed to add color");
        }
    };

    return {
        productDetail, product,
        newColor, setNewColor,
        gender, type,
        handleAddColor,
    }
}

export default ProductDetailVM;