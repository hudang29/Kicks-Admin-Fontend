import {useParams} from "react-router-dom";
import {useCallback, useEffect, useState} from "react";
import ProductDetailAPI from "../api/ProductDetailAPI";
import ProductAPI from "../api/ProductAPI";
import CategoryAPI from "../api/CategoryAPI";
import {stopLoadingWithDelay} from "../utils/Util";
import GalleryAPI from "../api/GalleryAPI";
import SizeAPI from "../api/SizeAPI";
import DiscountAPI from "../api/DiscountAPI";
import SizeModel from "../models/SizeModel";
import sizeModel from "../models/SizeModel";

function ProductDetailVM() {
    const {id} = useParams();

    const [loading, setLoading] = useState(false);

    const [productDetail, setProductDetail] = useState([]);
    const [discount, setDiscount] = useState([]);
    const [product, setProduct] = useState({});
    const [picture, setPicture] = useState([
        {
            detail: "",
            pictureUrl: "",
            listImg: []
        }
    ]);
    const [size, setSize] = useState([
        {
            detail: "",
            sizeDetail: []
        }
    ]);

    const [newColor, setNewColor] = useState("");
    const [gender, setGender] = useState({});
    const [type, setType] = useState({});
    const [reload, setReload] = useState(false);
    const [shoesColor, setShoesColor] = useState([]);


    useEffect(() => {
        document.title = "Shoes Detail";
        const fetchProductData = async () => {
            setLoading(true);
            if (!id) return;
            try {
                const [productDetailData, productData, discountData] = await Promise.all([
                    ProductDetailAPI.getAll(id),
                    ProductAPI.getProductById(id),
                    DiscountAPI.getAll()
                ]);

                setProductDetail(productDetailData);
                setShoesColor(productDetailData.map(({id, color}) => ({id, color})));
                setProduct(productData);
                setDiscount(discountData);
            } catch (error) {
                console.error("Error fetching product data:", error);
            } finally {
                stopLoadingWithDelay(setLoading);
            }
        }
        fetchProductData();
    }, [id]);

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
    }, [product?.shoesCategoryID, product?.genderCategoryID]);

    // const fetchGallery = useCallback(async (detailId) => {
    //     try {
    //         const data = await GalleryAPI.getProductDetailGallery(detailId);
    //         const galleries = await GalleryAPI.getAllProductDetailGallery(detailId);
    //
    //         setPicture(prevState => ([
    //                 ...prevState,
    //                 {
    //                     detail: detailId,
    //                     pictureUrl: data,
    //                     listImg: galleries,
    //                 }
    //             ]));
    //     } catch (error) {
    //         console.error("Error fetching detail image:", error);
    //     }
    // }, []);

    const fetchGallery = useCallback(async (detailId) => {
        try {
            const data = await GalleryAPI.getProductDetailGallery(detailId);
            const galleries = await GalleryAPI.getAllProductDetailGallery(detailId);

            setPicture(prevState => {
                const existingIndex = prevState.findIndex(item => item.detail === detailId);

                if (existingIndex !== -1) {
                    // Nếu tồn tại, cập nhật phần tử cũ
                    return prevState.map((item, index) =>
                        index === existingIndex ? { detail: detailId, pictureUrl: data, listImg: galleries } : item
                    );
                } else {
                    // Nếu chưa có, thêm mới vào mảng
                    return [...prevState, { detail: detailId, pictureUrl: data, listImg: galleries }];
                }
            });
        } catch (error) {
            console.error("Error fetching detail image:", error);
        }
    }, []);

    // const fetchSize = useCallback(async (detailId) => {
    //     try {
    //         const response = await SizeAPI.getAll(detailId)
    //         //console.log(response)
    //         setSize(prevState => {
    //             const updatedState = new Map(prevState);
    //             updatedState.set(detailId, {
    //                 detail: detailId,
    //                 sizeDetail: response,
    //             });
    //             return updatedState;
    //         });
    //     } catch (error) {
    //         console.error("Error fetching detail image:", error);
    //     }
    // }, []);

    const fetchSize = useCallback(async (detailId) => {
        try {
            const response = await SizeAPI.getAll(detailId);

            setSize(prevState => {
                const existingIndex = prevState.findIndex(item => item.detail === detailId);

                if (existingIndex !== -1) {
                    // Nếu tồn tại, cập nhật phần tử cũ
                    return prevState.map((item, index) =>
                        index === existingIndex ? { detail: detailId, sizeDetail: response } : item
                    );
                } else {
                    // Nếu chưa có, thêm mới vào mảng
                    return [...prevState, { detail: detailId, sizeDetail: response }];
                }
            });
        } catch (error) {
            console.error("Error fetching size data:", error);
        }
    }, []);



    useEffect(() => {
        fetchCategoryData();
    }, [fetchCategoryData]);

    useEffect(() => {
        productDetail.forEach(({id}) => {
            fetchGallery(id);
        });
    }, [fetchGallery, productDetail]);

    useEffect(() => {
        productDetail.forEach(({id}) => {
            fetchSize(id);
        });
    }, [fetchSize, productDetail]);


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

    const handleColorChange = (id, newColor) => {
        setProductDetail((prevDetails) =>
            prevDetails.map((item) =>
                item.id === id ? {...item, color: newColor} : item
            )
        );
    };

    const handleDiscountChange = (id, discount) => {
        setProductDetail((prevDetails) =>
            prevDetails.map((item) =>
                item.id === id ? {...item, discountId: discount} : item
            )
        );
    };

    const handleStockChange = (id, detailId, stock) => {
        setSize((prevSize) => (
            prevSize.map((item) => (
                (item?.detail === detailId) ? {...item, sizeDetail: item?.sizeDetail?.map( size =>
                        size?.id === id ? { ...size, stock: stock } : size
                    )} : item
            ))
        ));
    };

    const handleActiveBody = () => {

    }

    return {
        loading, picture, size, discount,
        productDetail, setProductDetail,
        shoesColor,
        product, setProduct,
        newColor,
        setNewColor,
        gender,
        type,
        handleColorChange, handleDiscountChange, handleStockChange,
        handleAddColor,
    };
}

export default ProductDetailVM;