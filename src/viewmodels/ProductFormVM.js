import {useParams} from "react-router-dom";
import {useCallback, useEffect, useState} from "react";
import ProductDetailAPI from "../api/ProductDetailAPI";
import ProductAPI from "../api/ProductAPI";
import SupplierAPI from "../api/SupplierAPI";
import CategoryAPI from "../api/CategoryAPI";
import DiscountAPI from "../api/DiscountAPI";
import SizeAPI from "../api/SizeAPI";
import SizeModel from "../models/SizeModel";
import GalleryAPI from "../api/GalleryAPI";
import UploadImgAPI from "../api/UploadImgAPI";
import ProductDetailModel from "../models/ProductDetailModel";
import ProductModel from "../models/ProductModel";

function ProductFormVM() {

    const {detailId} = useParams();
    const [initialData, setInitialData] = useState(false);
    // State
    const [shoesDetail, setShoesDetail] = useState(new ProductDetailModel(
        "", "", "", "", ""));

    const [shoes, setShoes] = useState(new ProductModel(
        "", "", "", "", "", "", "", ""));

    const [genderCategory, setGenderCategory] = useState([]);
    const [shoesCategory, setShoesCategory] = useState([]);
    const [supplier, setSupplier] = useState([]);
    const [discount, setDiscount] = useState([]);
    const [salePrice, setSalePrice] = useState(0);
    const [size, setSize] = useState([]);
    const [sizeSample, setSizeSample] = useState([]);
    const [stockData, setStockData] = useState([]);
    const [sizeModels, setSizeModels] = useState([]);
    const [galleryList, setGalleryList] = useState([]);
    const [gallery, setGallery] = useState("");
    const [file, setFile] = useState("");

    const fetchData = useCallback(async (detailId) => {
        try {
            const productDetailData = await ProductDetailAPI.getDetailByID(detailId);
            setShoesDetail(new ProductDetailModel(
                productDetailData.id,
                productDetailData.productId,
                productDetailData.color,
                productDetailData.discountId,
                productDetailData.isDefault
            ));

            const productData = productDetailData?.productId
                ? await ProductAPI.getProductById(productDetailData.productId) : null;
            setShoes(new ProductModel(
                productData.id,
                productData.name,
                productData.shoesCategoryID,
                productData.brand,
                productData.price,
                productData.description,
                productData.supplierID,
                productData.genderCategoryID
            ));

            const [supplierData, genderData, discountData, sizeData] = await Promise.all([
                SupplierAPI.getAll(),
                CategoryAPI.getAllGenderCategory(),
                DiscountAPI.getAll(),
                SizeAPI.getAll(detailId),
            ]);

            setSupplier(supplierData);
            setGenderCategory(genderData);
            setDiscount(discountData);

            const formattedSize = sizeData.map(item => ({
                ...item,
                stock: item.stock ?? 0
            }));
            setSize(formattedSize);
        } catch (error) {
            console.error("Error loading data:", error);
        }

    }, [setShoesDetail, setShoes, setSupplier, setGenderCategory, setDiscount, setSize]);

    useEffect(() => {
        document.title = "Shoes Form";
        if (!detailId) return;
        fetchData(detailId);
    }, [detailId, initialData, fetchData]);


    const fetchGallery = useCallback(async (detailId) => {
        try {
            const data = await GalleryAPI.getProductDetailGallery(detailId);
            setGallery(data);

            const galleries = await GalleryAPI.getAllProductDetailGallery(detailId);
            setGalleryList(galleries);
        } catch (error) {
            console.error("Error fetching detail image:", error);
        }
    }, []);

    const fetchShoesCategory = useCallback(async (genderCategoryID) => {
        if (!genderCategoryID) return;
        try {
            const categories = await CategoryAPI.getAllCategoryShoesByGenderId(genderCategoryID);
            setShoesCategory(categories);
        } catch (error) {
            console.error("Error fetching shoe categories:", error);
        }
    }, []);

    const calculateSalePrice = useCallback(() => {
        const price = shoes.price || NaN;
        const discountId = Number(shoesDetail.discountId);
        const discountRate = discount.find(d => d.id === discountId)?.discountRate || 0;
        setSalePrice(discountRate > 0 ? price - (price * discountRate / 100) : price);
    }, [shoes.price, shoesDetail.discountId, discount]);

    useEffect(() => {
        if (!detailId) return;
        fetchGallery(detailId);
    }, [detailId, fetchGallery]);

    useEffect(() => {
        fetchShoesCategory(shoes.genderCategoryID);
    }, [shoes.genderCategoryID, fetchShoesCategory]);

    useEffect(() => {
        calculateSalePrice();
    }, [calculateSalePrice]);


    useEffect(() => {
        const loadSizes = async () => {
            try {
                const data = await SizeAPI.getAllSample();
                setSizeSample(data);
            } catch (error) {
                console.error("Error loading size list:", error);
            }
        };
        loadSizes();
    }, [])

    // Xử lý thay đổi số lượng size
    const handleChangeStock = (e, sizeId) => {
        const value = Number(e.target.value);
        setSize(prevSizes =>
            prevSizes.map(size =>
                size.id === sizeId ? {...size, stock: Math.max(0, value)} : size
            )
        );
    };

    useEffect(() => {
        // Khi `sizeSample` thay đổi, map thành danh sách `SizeModel`
        const mappedSizes = sizeSample.map(sample => new SizeModel(sample.id, sample.size, 0));
        setSizeModels(mappedSizes);
    }, [sizeSample]);

    // Xử lý thay số lượng size mới
    const handleChangeStockSample = (e, sampleId) => {
        const newStock = Number(e.target.value);
        setStockData(prevStock => ({
            ...prevStock,
            [sampleId]: newStock // Gán stock theo ID của sample
        }));
        setSizeModels(prevSizes =>
            prevSizes.map(size =>
                size.id === sampleId ? new SizeModel(size.id, size.size, newStock) : size
            )
        );
    };

    const handleCreateSize = async () => {
        if (sizeModels.length === 0) {
            console.warn("No size data to send!");

            return;
        }
        try {
            const newSizeList = sizeModels.map(item => ({
                size: item.size,
                stock: item.stock,
            }));
            const response = await SizeAPI.createSizeList(newSizeList, detailId);
            if (response.status === 200 || response.status === 201) {
                console.log("Successfully created size list!", response.data);
                setSize(prevSizes => [...prevSizes, ...sizeModels]);
                setSizeModels([]);
                setInitialData((prevState) => !prevState);
            } else {
                console.error("An error occurred while creating the size list:", response);
            }
        } catch (error) {
            console.error("Error calling sizeAPI:", error);
        }
    };


    // Cancel
    const handleCancel = () => {
        setInitialData((prevState) => !prevState);
    };

    // Update sản phẩm
    const handleUpdate = async () => {
        const isConfirmed = window.confirm(`Update ${shoes.name}?`);
        if (!isConfirmed) return;

        try {
            if (!shoesDetail || !shoes) return;
            const updatedSizes = size.map(item => ({
                id: item.id,
                size: item.size,
                stock: item.stock,
            }));
            await Promise.allSettled([
                ProductAPI.updateProduct(shoes),
                ProductDetailAPI.updateProductDetail(shoesDetail),
                SizeAPI.update(updatedSizes, detailId),
            ]);
            alert("Successful!");
            setInitialData((prevState) => !prevState);
        } catch (error) {
            console.error("Error updating product:", error);
            alert("Failed to update!");
        }
    };

    const handleImgChange = (img) => {
        setGallery(img);
    };

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) return alert("Choose file please!");
        // Upload lên Cloudinary
        const url = await UploadImgAPI.uploadFile(file);
        if (!url) {
            return alert("No found image");
        }
        console.log(url);
        const newGallery = {
            image: url,
            productDetailID: detailId,
        }
        console.log(newGallery);
        GalleryAPI.addGallery(newGallery)
            .catch((error) => console.error("Error adding image", error.toJSON()));
        setGalleryList(prev => [...prev, newGallery]);
        alert("Save image successfully!");
    };

    return {
        detailId,
        shoes, setShoes, shoesDetail, setShoesDetail,
        genderCategory, shoesCategory, supplier, discount,
        salePrice,
        size, sizeSample, stockData,
        galleryList, gallery,
        handleChangeStock, handleChangeStockSample, handleCreateSize,
        handleCancel, handleUpdate,
        handleFileChange, handleUpload, handleImgChange
    };
}

export default ProductFormVM;