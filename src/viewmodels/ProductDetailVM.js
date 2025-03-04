import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import ProductDetailAPI from "../api/ProductDetailAPI";
import ProductAPI from "../api/ProductAPI";
import GalleryAPI from "../api/GalleryAPI";
import CategoryAPI from "../api/CategoryAPI";

function ProductDetailVM() {
    const {id} = useParams();

    const [productDetail, setProductDetail,] = useState([]);
    const [product, setProduct] = useState({});
    const [newColor, setNewColor] = useState(null);
    const [gender, setGender] = useState({});
    const [type, setType] = useState({});
    const [isDefault, setIsDefault] = useState(null);

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
    }, [id, isDefault]);

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

    // const handleChangeDefault = async (IsDefault) => {
    //     //const Detail = await ProductDetailAPI.getDetailByID(id)
    //
    //     setIsDefault(IsDefault)
    //     const updateDefault = {
    //         productId: id,
    //         isDefault: isDefault};
    //
    //     ProductDetailAPI.updateProductDetail(updateDefault)
    //         .catch((error) => console.log("error", error))
    // };

    return {
        productDetail,
        product,
        newColor,
        setNewColor,
        gender, type,
        handleAddColor,
    }
}

export default ProductDetailVM;