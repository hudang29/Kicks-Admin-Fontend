import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import ProductDetailAPI from "../api/ProductDetailAPI";
import ProductAPI from "../api/ProductAPI";
import SupplierAPI from "../api/SupplierAPI";
import CategoryAPI from "../api/CategoryAPI";
import DiscountAPI from "../api/DiscountAPI";
import SizeAPI from "../api/SizeAPI";
import SizeModel from "../models/SizeModel";
import GalleryAPI from "../api/GalleryAPI";
import UploadImgAPI from "../api/UploadImgAPI";

function ProductFormVM() {

    const {id} = useParams();

    const [initialData, setInitialData] = useState({
        productDetail: null,
        product: null,
        productName: null,
        selectedGender: null,
        selectedShoes: null,
        selectedSupplier: null,
        selectDiscount: null,
        productPrice: null,
        productBrand: null,
        productDescription: null,
        color: null,
        size: [],
    });

    // State
    const [productDetail, setProductDetail] = useState({});
    const [product, setProduct] = useState({});
    const [genderCategory, setGenderCategory] = useState([]);
    const [selectedGender, setSelectedGender] = useState("");
    const [shoesCategory, setShoesCategory] = useState([]);
    const [selectedShoes, setSelectedShoes] = useState("");
    const [supplier, setSupplier] = useState([]);
    const [selectedSupplier, setSelectedSupplier] = useState("");
    const [discount, setDiscount] = useState([]);
    const [selectDiscount, setSelectDiscount] = useState("");
    const [salePrice, setSalePrice] = useState(0);
    const [size, setSize] = useState([]);
    const [sizeSample, setSizeSample] = useState([]);
    const [stockData, setStockData] = useState([]);
    const [sizeModels, setSizeModels] = useState([]);

    //thay đổi giá trị
    const [productName, setProductName] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productBrand, setProductBrand] = useState("");
    const [color, setColor] = useState("");

    const [galleryList, setGalleryList] = useState([]);
    const [file, setFile] = useState("");

    useEffect(() => {
        document.title = "Product Detail";
    }, []);
    // Fetch dữ liệu
    useEffect(() => {
        if (!id) return;
        const fetchData = async () => {
            try {
                const productDetailData = await ProductDetailAPI.getDetailByID(id);
                setProductDetail(productDetailData);
                const productData = productDetailData?.productId
                    ? await ProductAPI.getProductById(productDetailData.productId)
                    : null;
                setProduct(productData);
                const [supplierData,
                    genderData,
                    discountData,
                    sizeData] = await Promise.all([
                    SupplierAPI.getAll(),
                    CategoryAPI.getAllGenderCategory(),
                    DiscountAPI.getAll(),
                    SizeAPI.getAll(id),
                ]);
                setSupplier(supplierData);
                setGenderCategory(genderData);
                setDiscount(discountData);
                const formattedSize = sizeData.map(item => ({
                    ...item,
                    stock: item.stock ?? 0,
                }));
                setSize(formattedSize);

                // Lưu trạng thái ban đầu
                setInitialData({
                    productDetail: productDetailData,
                    product: productData,
                    productName: productData?.name || null,
                    selectedGender: productData?.genderCategoryID || null,
                    selectedShoes: productData?.shoesCategoryID || null,
                    selectedSupplier: productData?.supplierID || null,
                    selectDiscount: productDetailData?.discountId || null,
                    productPrice: productData?.price || null,
                    productBrand: productData?.brand || null,
                    productDescription: productData?.description || null,
                    color: productDetailData?.color || null,
                    size: formattedSize,
                });
            } catch (error) {
                console.error("Lỗi khi tải dữ liệu:", error);
            }
        };

        fetchData();
    }, [id]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const fetchGallery = async () => {
        const galleries = await GalleryAPI.getAllProductDetailGallery(id)
        setGalleryList(galleries);
    }
    useEffect(() => {
        fetchGallery();
    }, [fetchGallery])

    // Fetch category shoes khi selectedGender thay đổi
    useEffect(() => {
        if (!selectedGender) return;
        CategoryAPI.getAllCategoryShoesByGenderId(selectedGender)
            .then(setShoesCategory)
            .catch(error => console.error("Lỗi khi lấy danh mục giày:", error));
    }, [selectedGender]);

    // Cập nhật giá khi product hoặc discount thay đổi
    useEffect(() => {
        const price = productPrice || NaN;
        const discountId = Number(selectDiscount);
        const discountRate = discount.find(d => d.id === discountId)?.discountRate || 0;
        setSalePrice(discountRate > 0 ? price - (price * discountRate / 100) : price);
    }, [productPrice, selectDiscount, discount]);

    // Gán ID khi mở form
    useEffect(() => {
        if (product) {
            setSelectedGender(product.genderCategoryID);
            setSelectedShoes(product.shoesCategoryID);
            setSelectedSupplier(product.supplierID);
            setProductName(product.name || null);
            setProductBrand(product.brand || null);
            setProductPrice(product.price || 0);
            setProductDescription(product.description || null);
        }
    }, [product]);

    useEffect(() => {
        if (productDetail) {
            setSelectDiscount(productDetail.discountId || "errors");
            setColor(productDetail.color || null);
        }
    }, [productDetail]);

    useEffect(() => {
        const loadSizes = async () => {
            try {
                const data = await SizeAPI.getAllSample();
                setSizeSample(data);
            } catch (error) {
                console.error("Lỗi khi tải danh sách size:", error);
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
            console.warn("Không có dữ liệu size để gửi!");
            return;
        }
        try {
            const newSizeList = sizeModels.map(item => ({
                size: item.size,
                stock: item.stock,
            }));
            const response = await SizeAPI.createSizeList(newSizeList, id);
            if (response.status === 200 || response.status === 201) {
                console.log("Tạo danh sách size thành công!", response.data);
                // Cập nhật danh sách size sau khi API thành công
                setSize(prevSizes => [...prevSizes, ...sizeModels]);
                setSizeModels([]);
            } else {
                console.error("Có lỗi xảy ra khi Tạo danh sách size:", response);
            }
        } catch (error) {
            console.error("Lỗi khi gọi sizeAPI:", error);
        }
    };


    // Cancel
    const handleCancel = () => {
        setProductDetail(initialData.productDetail);
        setProduct(initialData.product);
        setProductName(initialData.productName);
        setSelectedGender(initialData.selectedGender);
        setSelectedShoes(initialData.selectedShoes);
        setSelectedSupplier(initialData.selectedSupplier);
        setSelectDiscount(initialData.selectDiscount);
        setProductPrice(initialData.productPrice);
        setProductBrand(initialData.productBrand);
        setProductDescription(initialData.productDescription);
        setColor(initialData.color);
        setSize(initialData.size);
    };

    // Update sản phẩm
    const handleUpdate = async () => {
        const isConfirmed = window.confirm("Bạn có muốn cập nhật sản phẩm này?");
        if (!isConfirmed) {
            return; // Nếu người dùng nhấn "Hủy", không tiếp tục cập nhật
        }
        try {
            if (!productDetail || !product) {
                console.error("Dữ liệu không hợp lệ để cập nhật.");
                return;
            }
            // Chuẩn bị dữ liệu cập nhật
            const updatedProduct = {
                ...product,
                name: productName,
                genderCategoryID: selectedGender,
                shoesCategoryID: selectedShoes,
                supplierID: selectedSupplier,
                price: productPrice,
                brand: productBrand,
                description: productDescription,
            };
            const updatedProductDetail = {
                ...productDetail,
                name: productName,
                discountId: selectDiscount === 'errors' ? 0 : selectDiscount,
                color: color,
            };
            // Chuẩn bị dữ liệu gửi lên API
            const updatedSizes = size.map(item => ({
                id: item.id,
                size: item.size,
                stock: item.stock,
            }));
            const results = await Promise.allSettled([
                ProductAPI.updateProduct(updatedProduct),
                ProductDetailAPI.updateProductDetail(updatedProductDetail),
                SizeAPI.update(updatedSizes, id),
            ]);
            results.forEach((result, index) => {
                if (result.status === "rejected") {
                    console.error(`API thứ ${index + 1} thất bại:`, result.reason);
                    alert(`Cập nhật thất bại: ${result.reason}`);
                }
            });
            setInitialData({
                productDetail: updatedProductDetail,
                product: updatedProduct,
                productName: updatedProduct?.name || null,
                selectedGender: updatedProduct?.genderCategoryID || null,
                selectedShoes: updatedProduct?.shoesCategoryID || null,
                selectedSupplier: updatedProduct.supplierID || null,
                selectDiscount: updatedProductDetail?.discountId || null,
                productPrice: updatedProduct?.price || null,
                productBrand: updatedProduct?.brand || null,
                productDescription: updatedProduct?.description || null,
                color: updatedProductDetail?.color || null,
                size: size,
            });
            alert("Cập nhật thành công!");
        } catch (error) {
            console.error("Lỗi khi cập nhật sản phẩm:", error);
            alert("Cập nhật thất bại!");
        }
    };

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) return alert("Vui lòng chọn file!");
        // 1️⃣ Upload lên Cloudinary
        const url = await UploadImgAPI.uploadFile(file);
        if (!url) {
            return alert("Không có hình");
        }
        const newGallery = {
            image: url,
            productDetailID: id,
        }
        GalleryAPI.addGallery(newGallery)
            .catch((error) => console.error("Lỗi thêm img",error.toJSON()))
        await fetchGallery();
        alert("Lưu ảnh thành công!");
    };

    return {
        id,
        product,
        productName, setProductName,
        productBrand, setProductBrand,
        productPrice, setProductPrice,
        productDescription, setProductDescription,
        genderCategory, selectedGender, setSelectedGender,
        shoesCategory, selectedShoes, setSelectedShoes,
        supplier, selectedSupplier, setSelectedSupplier,
        discount, selectDiscount, setSelectDiscount,
        salePrice,
        color, setColor,
        size, sizeSample, stockData,
        galleryList,
        handleChangeStock, handleChangeStockSample, handleCreateSize,
        handleCancel,
        handleUpdate,
        handleFileChange, handleUpload
    };
}

export default ProductFormVM;