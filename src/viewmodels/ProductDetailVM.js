import {useParams} from "react-router-dom";
import {useCallback, useEffect, useState} from "react";
import ProductDetailAPI from "../api/ProductDetailAPI";
import ProductAPI from "../api/ProductAPI";
import CategoryAPI from "../api/CategoryAPI";
import {stopLoadingWithDelay} from "../utils/Util";
import GalleryAPI from "../api/GalleryAPI";
import SizeAPI from "../api/SizeAPI";
import DiscountAPI from "../api/DiscountAPI";
import SupplierAPI from "../api/SupplierAPI";
import UploadImgAPI from "../api/UploadImgAPI";
import {validateNumber} from "../utils/ValidationForm";

function ProductDetailVM() {
    const {id} = useParams();
    const [selectDetailId, setSelectDetailId] = useState("");
    const [loading, setLoading] = useState(false);
    const [initialData, setInitialData] = useState({
        productData: false,
        sizeData: false,
    });

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
    const [gender, setGender] = useState([]);
    const [type, setType] = useState([]);
    const [supplier, setSupplier] = useState([]);
    const [file, setFile] = useState("");
    const [newColor, setNewColor] = useState("");
    const [shoesColor, setShoesColor] = useState([]);

    const [errorMessage, setErrorMessage] = useState({
        name: "",
        price: "",
    });
    const [salePrice, setSalePrice] = useState(0);


    useEffect(() => {
        document.title = "Shoes Detail";
        const fetchData = async () => {
            setLoading(true);
            if (!id) return;
            try {
                const [productDetailData, productData, discountData, genderData, supplierData] = await Promise.all([
                    ProductDetailAPI.getAll(id),
                    ProductAPI.getProductById(id),
                    DiscountAPI.getAll(),
                    CategoryAPI.getAllGenderCategory(),
                    SupplierAPI.getAll(),
                ]);

                setProductDetail(productDetailData);
                setShoesColor(productDetailData.map(({id, color}) => ({id, color})));
                setProduct(productData);
                setDiscount(discountData);
                setGender(genderData);
                setSupplier(supplierData);

                setErrorMessage({
                    name: "",
                    price: "",
                });
            } catch (error) {
                console.error("Error fetching product data:", error);
            } finally {
                stopLoadingWithDelay(setLoading);
            }
        }
        fetchData();
    }, [id, initialData.productData]);

    useEffect(() => {
        if (!product?.genderCategoryID) return;
        const fetchShoeCategories = async () => {
            try {
                const type = await CategoryAPI.getAllCategoryShoesByGenderId(product.genderCategoryID);
                setType(type);
            } catch (error) {
                console.error("Error fetching shoe categories:", error);
            }
        };
        fetchShoeCategories();
    }, [product?.genderCategoryID]);

    const fetchGalleryAndSize = useCallback(async (detailId) => {
        try {
            const [galleryData, galleryList, sizeData] = await Promise.all([
                GalleryAPI.getProductDetailGallery(detailId),
                GalleryAPI.getAllProductDetailGallery(detailId),
                SizeAPI.getAll(detailId)
            ]);

            setPicture(prevState => {
                const existingIndex = prevState.findIndex(item => item.detail === detailId);
                if (existingIndex !== -1) {
                    return prevState.map((item, index) =>
                        index === existingIndex ? {
                            detail: detailId,
                            pictureUrl: galleryData,
                            listImg: galleryList
                        } : item
                    );
                } else {
                    return [...prevState, {detail: detailId, pictureUrl: galleryData, listImg: galleryList}];
                }
            });

            setSize(prevState => {
                const existingIndex = prevState.findIndex(item => item.detail === detailId);
                if (existingIndex !== -1) {
                    return prevState.map((item, index) =>
                        index === existingIndex ? {detail: detailId, sizeDetail: sizeData} : item
                    );
                } else {
                    return [...prevState, {detail: detailId, sizeDetail: sizeData}];
                }
            });
        } catch (error) {
            console.error("Error fetching gallery and size data:", error);
        }
    }, []);

    useEffect(() => {
        productDetail.forEach(({id}) => {
            fetchGalleryAndSize(id);
        });
    }, [fetchGalleryAndSize, productDetail, initialData.sizeData]);

    const handleAddColor = async () => {
        if (!newColor.trim()) {
            alert("Please enter a new color!");
            return;
        }

        try {
            const newProductDetail = {color: newColor, productId: id};
            const response = await ProductDetailAPI.createProductDetail(newProductDetail);
            setProductDetail((prev) => [...prev, response]);
            setNewColor("");
            alert("Color added successfully!");
        } catch (error) {
            console.error("Error adding new color:", error);
            alert("Failed to add color!");
        }
    };

    const handleSalePriceChange = useCallback(() => {
        const price = product?.price || NaN;
        const discountId = Number(productDetail.find(d => d.id === selectDetailId)?.discountId);
        const discountRate = discount.find(d => d.id === discountId)?.discountRate || 0;
        setSalePrice(discountRate > 0 ? price - (price * discountRate / 100) : price);
    }, [discount, product?.price, productDetail, selectDetailId]); // Thêm `selectedId`


    useEffect(() => {
        if (selectDetailId) handleSalePriceChange();
    }, [selectDetailId, productDetail, discount, handleSalePriceChange]);

    const handlePriceChange = (e) => {
        const value = e.target.value;
        setProduct((prevShoes) => ({
            ...prevShoes,
            price: e.target.value
        }));
        setErrorMessage(prevState => ({
            ...prevState,
            price: (!value) ? "must not be empty" : validateNumber(value)
        }));
    }

    const handleColorChange = (id, newColor) => {
        setProductDetail((prevDetails) =>
            prevDetails.map((item) =>
                item.id === id ? {...item, color: newColor} : item
            )
        );
    };

    const handleDiscountChange = (id, discount) => {
        setSelectDetailId(id);
        setProductDetail((prevDetails) =>
            prevDetails.map((item) =>
                item.id === id ? {...item, discountId: discount} : item
            )
        );
    };

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleStockChange = (id, detailId, stock) => {
        setSize((prevSize) => (
            prevSize.map((item) => (
                (item?.detail === detailId) ? {
                    ...item, sizeDetail: item?.sizeDetail?.map(size =>
                        size?.id === id ? {...size, stock: stock} : size
                    )
                } : item
            ))
        ));
    };

    const handleUpdateProduct = async () => {
        const isConfirmed = window.confirm(`Update ${product.name}?`);
        if (!isConfirmed) return;
        if (!product) return;

        try {
            const response = await ProductAPI.updateProduct(product);
            setProduct(prevState => ({
                ...prevState,
                response,
            }))
            alert("Successful!");
        } catch (error) {
            console.error("Error updating product:", error);
            alert("Failed to update!");
        }
    };

    const handleUpdateDetail = async (id) => {
        const productToUpdate = productDetail.find((item) => item.id === id);
        if (!productToUpdate) {
            alert("Product detail not found!");
            return;
        }
        const isConfirmed = window.confirm(`Update detail of ${product.name}?`);
        if (!isConfirmed) return;

        try {
            const response = await ProductDetailAPI.updateProductDetail(productToUpdate);
            setProductDetail(prevDetails =>
                prevDetails.map(item => (item.id === id ? {...item, ...response} : item))
            );
            alert("Successful!");
        } catch (error) {
            console.error("Error updating detail:", error);
            alert("Failed to update!");
        }
    };

    const handleUpload = async (id) => {
        if (!file) return alert("Choose file please!");
        try {
            const url = await UploadImgAPI.uploadFile(file);
            if (!url) return alert("No found image");
            const newGallery = {
                image: url,
                productDetailID: id,
            }
            const response = await GalleryAPI.addGallery(newGallery);
            setPicture(prevState =>
                prevState.map(item => (
                    item.detail === id ? {...item, listImg: [...item.listImg, response]} : item
                ))
            );
            alert("Save image successfully!");
        } catch (error) {
            console.error("Error add new image:", error);
            alert("Failed to add!");
        }
    };

    const handleUpdateSize = async (id) => {
        const isConfirmed = window.confirm(`Update size for ${product.name} ?`);
        if (!isConfirmed) return;
        if (!id) return alert("Not found detail!");
        try {
            const updatedSizes = size.find(size => size.detail === id).sizeDetail;
            await SizeAPI.update(updatedSizes, id);
            setInitialData((prevState) => ({
                ...prevState,
                productData: !prevState.productData,
            }));
            alert("Successfully!");
        } catch (error) {
            console.error("Error updating size:", error);
            alert("Failed to updating!");
        }
    }

    const handleReset = () => {
        setInitialData((prevState) => ({
            ...prevState,
            productData: !prevState.productData,
        }));
    };

    return {
        loading, errorMessage, salePrice,
        product, setProduct, productDetail,
        type, gender, supplier, discount,
        picture, size,
        shoesColor,
        newColor, setNewColor,
        handleColorChange, handleDiscountChange, handleStockChange, handleFileChange, handlePriceChange,
        handleAddColor,
        handleUpdateProduct, handleUpdateDetail, handleUpload, handleUpdateSize,
        handleReset,
    };
}

export default ProductDetailVM;