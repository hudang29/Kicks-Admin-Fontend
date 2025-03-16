import {useParams} from "react-router-dom";
import {useEffect, useState, useCallback} from "react";
import ProductDetailAPI from "../api/ProductDetailAPI";
import ProductAPI from "../api/ProductAPI";
import CategoryAPI from "../api/CategoryAPI";
import {stopLoadingWithDelay} from "../utils/Util";

function ProductDetailVM() {
    const {id} = useParams();

    const [loading, setLoading] = useState(false);

    const [productDetail, setProductDetail] = useState([]);
    const [product, setProduct] = useState({});
    const [newColor, setNewColor] = useState("");
    const [gender, setGender] = useState({});
    const [type, setType] = useState({});
    const [reload, setReload] = useState(false);

    const fetchProductData = useCallback(async () => {
        setLoading(true);
        if (!id) return;
        try {
            const productDetailData = await ProductDetailAPI.getAll(id);
            setProductDetail(productDetailData);

            const productData = await ProductAPI.getProductById(id);
            setProduct(productData);
        } catch (error) {
            console.error("Error fetching product data:", error);
        } finally {
            stopLoadingWithDelay(setLoading);
        }
    }, [id, reload]);

    const fetchCategoryData = useCallback(() => {
        setLoading(true);
        if (product?.shoesCategoryID) {
            CategoryAPI.getShoesCategoryById(product.shoesCategoryID)
                .then(setType)
                .catch((error) => console.error("Error fetching shoe category:", error))
                .finally(() => {
                    stopLoadingWithDelay(setLoading);
                });
        }
        if (product?.genderCategoryID) {
            CategoryAPI.getGenderCategoryById(product.genderCategoryID)
                .then(setGender)
                .catch((error) => console.error("Error fetching gender category:", error))
                .finally(() => {
                    stopLoadingWithDelay(setLoading);
                });
        }
    }, [product]);

    useEffect(() => {
        document.title = "Shoes Detail";
        fetchProductData();
    }, [fetchProductData]);

    useEffect(() => {
        fetchCategoryData();
    }, [fetchCategoryData]);

    const handleAddColor = async () => {
        if (!newColor.trim()) {
            alert("Please enter a new color!");
            return;
        }

        try {
            const newProductDetail = {color: newColor, productId: id};
            const response = await ProductDetailAPI.createProductDetail(newProductDetail);
            setProductDetail((prev) => [...prev, response]);
            setReload((prev) => !prev);
            setNewColor("");
            alert("Color added successfully!");
        } catch (error) {
            console.error("Error adding new color:", error);
            alert("Failed to add color!");
        }
    };

    return {
        loading,
        productDetail,
        product,
        newColor,
        setNewColor,
        gender,
        type,
        handleAddColor,
    };
}

export default ProductDetailVM;