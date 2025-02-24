import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import ProductDetailAPI from "../api/ProductDetailAPI";
import ProductAPI from "../api/ProductAPI";
import SupplierAPI from "../api/SupplierAPI";
import CategoryAPI from "../api/CategoryAPI";
import DiscountAPI from "../api/DiscountAPI";
import SizeAPI from "../api/SizeAPI";

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
        size: [],
    });

    // State
    const [productDetail, setProductDetail] = useState(null);
    const [product, setProduct] = useState(null);
    const [genderCategory, setGenderCategory] = useState([]);
    const [selectedGender, setSelectedGender] = useState(null);
    const [shoesCategory, setShoesCategory] = useState([]);
    const [selectedShoes, setSelectedShoes] = useState(null);
    const [supplier, setSupplier] = useState([]);
    const [selectedSupplier, setSelectedSupplier] = useState(null);
    const [discount, setDiscount] = useState([]);
    const [selectDiscount, setSelectDiscount] = useState(null);

    const [salePrice, setSalePrice] = useState(0);
    const [size, setSize] = useState([]);

    //thay đổi giá trị
    const [productName, setProductName] = useState(null);
    const [productDescription, setProductDescription] = useState(null);
    const [productPrice, setProductPrice] = useState(null);
    const [productBrand, setProductBrand] = useState(null);



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

                const [supplierData, genderData, discountData, sizeData] = await Promise.all([
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
                    size: formattedSize,
                });

            } catch (error) {
                console.error("Lỗi khi tải dữ liệu:", error);
            }
        };
        fetchData();
        //console.log(initialData);
    }, [id]);

    // Fetch category shoes khi selectedGender thay đổi
    useEffect(() => {
        if (!selectedGender) return;
        CategoryAPI.getAllCategoryShoesByGenderId(selectedGender)
            .then(setShoesCategory)
            .catch(error => console.error("Lỗi khi lấy danh mục giày:", error));
    }, [selectedGender]);

    // Cập nhật giá khi product hoặc discount thay đổi
    useEffect(() => {
        const price = product?.price || NaN;
        const discountId = Number(selectDiscount);
        const discountRate = discount.find(d => d.id === discountId)?.discountRate || 0;

        setSalePrice(discountRate > 0 ? price - (price * discountRate / 100) : price);
    }, [product?.price, selectDiscount, discount]);

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
        }
    }, [productDetail]);


    // Xử lý thay đổi số lượng size
    const handleChangeStock = (e, sizeId) => {
        const value = Number(e.target.value);
        setSize(prevSizes =>
            prevSizes.map(size =>
                size.id === sizeId ? {...size, stock: Math.max(0, value)} : size
            )
        );
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
        setSize(initialData.size);
    };

    // Update sản phẩm
    const handleUpdate = async () => {
        try {
            if (!productDetail || !product) {
                console.error("Dữ liệu không hợp lệ để cập nhật.");
                return;
            }

            // Chuẩn bị dữ liệu cập nhật
            const updatedProduct = {
                ...product,
                genderCategoryID: selectedGender,
                shoesCategoryID: selectedShoes,
                supplierID: selectedSupplier,
            };

            const updatedProductDetail = {
                ...productDetail,
                discountId: selectDiscount,
                //salePrice: salePrice,
            };

            const updatedSizes = size.map(item => ({
                id: item.id,
                stock: item.stock,
            }));

            // Gửi yêu cầu cập nhật
            await Promise.all([
                ProductAPI.update(product.id, updatedProduct),
                ProductDetailAPI.update(productDetail.id, updatedProductDetail),
                SizeAPI.updateSizes(updatedSizes),
            ]);

            alert("Cập nhật thành công!");

        } catch (error) {
            console.error("Lỗi khi cập nhật sản phẩm:", error);
            alert("Cập nhật thất bại!");
        }
    };

    return {
        id,
        productDetail,
        product,
        productName,
        setProductName,
        productBrand,
        setProductBrand,
        productPrice,
        setProductPrice,
        productDescription,
        setProductDescription,
        genderCategory,
        selectedGender,
        setSelectedGender,
        shoesCategory,
        selectedShoes,
        setSelectedShoes,
        supplier,
        selectedSupplier,
        setSelectedSupplier,
        discount,
        selectDiscount,
        setSelectDiscount,
        salePrice,
        size,
        handleChangeStock,
        handleCancel
    };
}

export default ProductFormVM;