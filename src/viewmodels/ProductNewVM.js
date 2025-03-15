import {useEffect, useState} from "react";
import CategoryAPI from "../api/CategoryAPI";
import SupplierAPI from "../api/SupplierAPI";
import categoryAPI from "../api/CategoryAPI";
import ProductAPI from "../api/ProductAPI";
import {validateForm} from "../utils/Validate";
import ProductModel from "../models/ProductModel";
import ProductDetailModel from "../models/ProductDetailModel";
import ProductDetailAPI from "../api/ProductDetailAPI";
import GalleryModel from "../models/GalleryModel";
import UploadImgAPI from "../api/UploadImgAPI";
import GalleryAPI from "../api/GalleryAPI";
import SizeModel from "../models/SizeModel";
import SizeAPI from "../api/SizeAPI";


function ProductNewVM() {

    const [detailId, setDetailId] = useState("");
    const [genderCategory, setGenderCategory] = useState([]);
    const [shoesCategory, setShoesCategory] = useState([]);
    const [shoes, setShoes] = useState(new ProductModel(
        "", "", "", "", "", "", "", "errors"
    ));
    const [image, setImage] = useState(new GalleryModel(
        "", "", "", ""
    ));
    const [size, setSize] = useState(new SizeModel(
        "", "", "",
    ));
    const [shoesSize, setShoesSize] = useState([])

    const [listSize, setListSize] = useState([]);
    const [sizeSample, setSizeSample] = useState([]);
    const [stockData, setStockData] = useState([]);
    const [listDetail, setListDetail] = useState([]);
    const [supplier, setSupplier] = useState([]);
    const [color, setColor] = useState("");
    const [colorList, setColorList] = useState([]);
    const [picture, setPicture] = useState("");
    const [galleryList, setGalleryList] = useState([]);
    //const [gallery, setGallery] = useState("");
    const [status, setStatus] = useState({
        shoes: false,
        color: false,
        img: false,
        size: false,
        reload: false,
        reloadImg: false,
        reloadSize: false,
    });

    useEffect(() => {
        CategoryAPI.getAllGenderCategory()
            .then(setGenderCategory)
            .catch((error) => console.error("Lỗi gender", error));

        SupplierAPI.getAll()
            .then(setSupplier)
            .catch((error) => console.error("Lỗi supplier", error));

    }, []);

    useEffect(() => {
        if (shoes.genderCategoryID) {
            CategoryAPI.getAllCategoryShoesByGenderId(shoes.genderCategoryID)
                .then(setShoesCategory)
                .catch((error) => console.error("Lỗi lấy id gender", error));
        }
    }, [shoes.genderCategoryID]);

    useEffect(() => {
        if (shoes.id) {
            ProductDetailAPI.getAll(shoes.id)
                .then(setListDetail)
                .catch((error) => console.error("Lỗi lấy id gender", error));
        }
    }, [shoes.id, status.reload]);

    useEffect(() => {
        if (image.productDetailID) {
            GalleryAPI.getAllProductDetailGallery(image.productDetailID)
                .then(response => {
                    setGalleryList(response)
                    console.log(response)
                })
                .catch((error) => console.error("Lỗi lấy id gender", error));
        }
    }, [image.productDetailID, status.reloadImg]);

    const activeCreateBtn = () => {
        return false;
    }

    const handleCreateProduct = async () => {

        const isConfirmed = window.confirm("Create this Product?");

        if (!isConfirmed) return;
        try {
            const newProduct = {
                name: shoes.name,
                shoesCategoryID: shoes.shoesCategoryID,
                brand: shoes.brand,
                price: shoes.price,
                description: shoes.description,
                supplierID: shoes.supplierID,
                genderCategoryID: shoes.genderCategoryID,
            }
            const response = await ProductAPI.createProduct(newProduct);
            //console.log(response);
            setStatus(prevStatus => ({
                ...prevStatus,
                shoes: true
            }));
            if (response && response.id) {
                setShoes(
                    (prevShoes) => ({
                        ...prevShoes,
                        id: response.id
                    }));
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        } catch (e) {
            alert("Failed to add new a shoes!");
            console.error("Lỗi khi tạo mới sản phẩm", e);
        }
    }

    const handleCreateDetail = async () => {
        if (!color.trim()) {
            alert("Please enter a new color!");
            return;
        }
        const isConfirmed = window.confirm(`Create this Color for ${shoes.name}?`);
        if (!isConfirmed) return;
        try {
            const newProductDetail = {color: color, productId: shoes.id};
            const response = await ProductDetailAPI.createProductDetail(newProductDetail);
            console.log(response);
            if (response) {
                //setDetailId(response?.id);
                setListDetail(prevState => ([
                    ...prevState,
                    new ProductDetailModel(
                        response?.id,
                        response?.productId,
                        response?.color,
                        response?.discountId,
                        response?.isDefault,
                    )
                ]));
                setColor("");
                setStatus(prevStatus => ({
                    ...prevStatus,
                    color: true
                }));
                const data = await ProductDetailAPI.getColorProductId(shoes.id)
                setColorList(data)

                setStatus(prevStatus => ({
                    ...prevStatus,
                    reload: !prevStatus.reload,
                }));
            }
            alert("Color added successfully!");
        } catch (error) {
            console.error("Error adding new color:", error);
            alert("Failed to add color!");
        }

    }

    const handleUpload = async () => {
        if (!picture) return alert("Choose file please!");
        // Upload lên Cloudinary
        const url = await UploadImgAPI.uploadFile(picture);
        if (!url) {
            return alert("No found image");
        }
        console.log(url);
        const newGallery = {
            image: url,
            productDetailID: image.productDetailID,
        }
        GalleryAPI.addGallery(newGallery)
            .catch((error) => console.error("Error adding image", error.toJSON()));
        setStatus(prevStatus => ({
            ...prevStatus,
            img: true
        }));
        setStatus(prevStatus => ({
            ...prevStatus,
            reloadImg: !prevStatus.reloadImg,
        }));
        setPicture("")
        alert("Save image successfully!");
    };

    useEffect(() => {

        const loadSizes = async () => {
            if (!detailId) return;
            try {
                const data = await SizeAPI.getAll(detailId);
                console.log(detailId)
                console.log(data)
                setShoesSize(data);
            } catch (error) {
                console.error("Error loading size list:", error);
            }
        };
        loadSizes();
    }, [detailId, status.reloadSize])


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

    useEffect(() => {
        if (detailId && detailId !== "Notfound") {
            // Reset tất cả stock về 0 khi đổi detailId
            const newStockData = {};
            sizeSample?.forEach(sample => {
                newStockData[sample.id] = 0;
            });
            setStockData(newStockData);
        }
    }, [detailId, sizeSample]);

    const handleChangeStockSample = (e, sampleId) => {
        const newStock = Number(e.target.value);
        setStockData(prevStock => ({
            ...prevStock,
            [sampleId]: newStock // Gán stock theo ID của sample
        }));
        setListSize(prevSizes =>
            prevSizes.map(size =>
                size.id === sampleId ? {
                    ...size,
                    stock: newStock
                } : size
            )
        );
    };

    useEffect(() => {
        // Khi `sizeSample` thay đổi, map thành danh sách `SizeModel`
        const mappedSizes = sizeSample.map(sample => new SizeModel(sample.id, sample.size, 0));
        setListSize(mappedSizes);
    }, [sizeSample]);

    const handleCreateSize = async () => {
        const isConfirmed = window.confirm("Are you sure you don't want to change anymore?");

        if (!isConfirmed) return;
        //console.log(listSize)
        if (listSize.length === 0) {
            console.warn("No size data to send!");
            return;
        }
        try {
            const newSizeList = listSize.map(item => ({
                size: item.size,
                stock: item.stock,
            }));
            const response = await SizeAPI.createSizeList(newSizeList, detailId);
            if (response.status === 200 || response.status === 201) {
                console.log("Successfully created size list!", response.data);
                //setSize(prevSizes => [...prevSizes, ...listSize]);
                setListSize([]);
                setSizeSample([])
            } else {
                console.error("An error occurred while creating the size list:", response);
            }
        } catch (error) {
            console.error("Error calling sizeAPI:", error);
        }
    };

    return {
        detailId, setDetailId,
        shoes, setShoes,
        listDetail, image, setImage,
        picture, setPicture, galleryList,
        genderCategory,
        shoesCategory,
        supplier,
        status, color, setColor, colorList,
        sizeSample, stockData, shoesSize,
        activeCreateBtn, handleCreateProduct, handleCreateDetail, handleUpload,
        handleChangeStockSample, handleCreateSize,
    };
}

export default ProductNewVM;