import {useEffect, useState} from "react";
import CategoryAPI from "../api/CategoryAPI";
import SupplierAPI from "../api/SupplierAPI";
import categoryAPI from "../api/CategoryAPI";
import ProductAPI from "../api/ProductAPI";


function ProductNewVM() {

    const [genderCategory, setGenderCategory] = useState([]);
    const [gender, setGender] = useState(null);
    const [selectedGender, setSelectedGender] = useState("errors");
    const [shoesCategory, setShoesCategory] = useState([]);
    const [type, setType] = useState(null);
    const [selectedShoeType, setSelectedShoeType] = useState(null);
    const [supplier, setSupplier] = useState([]);
    const [selectedSupplier, setSelectedSupplier] = useState(null);
    const [productName, setProductName] = useState(null);
    const [price, setPrice] = useState(null);
    const [description, setDescription] = useState(null);
    const [brand, setBrand] = useState(null);

    useEffect(() => {
        CategoryAPI.getAllGenderCategory()
            .then(setGenderCategory)
            .catch((error) => console.error("Lỗi gender", error));

        SupplierAPI.getAll()
            .then(setSupplier)
            .catch((error) => console.error("Lỗi supplier", error));

    }, []);

    useEffect(() => {
        if (selectedGender) {
            CategoryAPI.getAllCategoryShoesByGenderId(selectedGender)
                .then(setShoesCategory)
                .catch((error) => console.error("Lỗi lấy id gender", error));
            categoryAPI.getGenderCategoryById(selectedGender)
                .then(setGender)
                .catch((error) => console.error("Lỗi lấy tên gender", error));
        }
        if (selectedShoeType) {
            categoryAPI.getShoesCategoryById(selectedShoeType)
                .then(setType)
                .catch((error) => console.error("Lỗi lấy tên type", error))
        }
    }, [selectedGender, selectedShoeType]); // Thêm dependencies cần thiết

    const activeCreateBtn = () => {
        return (
            selectedGender !== "errors" &&
            selectedGender &&
            selectedShoeType &&
            selectedSupplier &&
            productName &&
            price &&
            description &&
            brand
        );
    }

    const handleCreateProduct = async (navigate) => {
        const isConfirmed = window.confirm("Create this Product?");

        if (!isConfirmed) {
            return; // Nếu người dùng nhấn "Hủy", không tiếp tục cập nhật
        }
        try {
            const newProduct = {
                name: productName,
                shoesCategoryID: selectedShoeType,
                brand: brand,
                price: price,
                description: description,
                supplierID: selectedSupplier,
                genderCategoryID: selectedGender,
            }
            const response = await ProductAPI.createProduct(newProduct);
            console.log("Sản phẩm đã được tạo:", response);
            if (response && response.id) {
                console.log("Sản phẩm đã tạo thành công, ID:", response.id);
                await new Promise(resolve => setTimeout(resolve, 1000));
                navigate(`/product/${response.id}`);
            }
        } catch (e) {
            console.error("Lỗi khi tạo mới sản phẩm", e);
        }
    }

    return {
        productName, setProductName, price, description, brand, setPrice, setDescription, setBrand,
        genderCategory, selectedGender, setSelectedGender, gender,
        shoesCategory, selectedShoeType, setSelectedShoeType, type,
        supplier, selectedSupplier, setSelectedSupplier,
        activeCreateBtn, handleCreateProduct
    };
}

export default ProductNewVM;