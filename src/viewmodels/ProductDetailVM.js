import {useParams} from "react-router-dom";
import {useEffect, useState, useCallback} from "react";
import ProductDetailAPI from "../api/ProductDetailAPI";
import ProductAPI from "../api/ProductAPI";
import CategoryAPI from "../api/CategoryAPI";

function ProductDetailVM() {
    const {id} = useParams();

    const [productDetail, setProductDetail] = useState([]);
    const [product, setProduct] = useState({});
    const [newColor, setNewColor] = useState("");
    const [gender, setGender] = useState({});
    const [type, setType] = useState({});
    const [reload, setReload] = useState(false);

    const fetchProductData = useCallback(async () => {
        if (!id) return;
        try {
            const productDetailData = await ProductDetailAPI.getAll(id);
            setProductDetail(productDetailData);

            const productData = await ProductAPI.getProductById(id);
            setProduct(productData);
        } catch (error) {
            console.error("Error fetching product data:", error);
        }
    }, [id, reload]);

    const fetchCategoryData = useCallback(() => {
        if (product?.shoesCategoryID) {
            CategoryAPI.getShoesCategoryById(product.shoesCategoryID)
                .then(setType)
                .catch((error) => console.error("Error fetching shoe category:", error));
        }
        if (product?.genderCategoryID) {
            CategoryAPI.getGenderCategoryById(product.genderCategoryID)
                .then(setGender)
                .catch((error) => console.error("Error fetching gender category:", error));
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