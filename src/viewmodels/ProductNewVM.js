import {useEffect, useState} from "react";
import CategoryAPI from "../api/CategoryAPI";
import SupplierAPI from "../api/SupplierAPI";
import categoryAPI from "../api/CategoryAPI";
import ProductAPI from "../api/ProductAPI";
import {validateForm} from "../utils/Validate";
import ProductModel from "../models/ProductModel";
import ProductDetailModel from "../models/ProductDetailModel";
import ProductDetailAPI from "../api/ProductDetailAPI";


function ProductNewVM() {

    const [genderCategory, setGenderCategory] = useState([]);
    const [shoesCategory, setShoesCategory] = useState([]);
    const [shoes, setShoes] = useState(new ProductModel(
        "", "", "", "", "", "", "", "errors"
    ));
    const [supplier, setSupplier] = useState([]);
    const [color, setColor] = useState("");
    const [colorList, setColorList] = useState([]);
    const [reload, setReload] = useState(false);
    const [status, setStatus] = useState({
        shoes: false,
        color: false,
        img: false,
        size: false,
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
            console.log(response);
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
                console.log("Sản phẩm đã tạo thành công, ID:", response.id);
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        } catch (e) {
            console.error("Lỗi khi tạo mới sản phẩm", e);
        }
    }

    const handleCreateDetail = async () => {
        if (!color.trim()) {
            alert("Please enter a new color!");
            return;
        }
        const isConfirmed = window.confirm(`Create this Color for \`${shoes.name}\`?`);
        if (!isConfirmed) return;
        try {
            const newProductDetail = {color: color, productId: shoes.id};
            const response = await ProductDetailAPI.createProductDetail(newProductDetail);
            console.log(response);
            if(response) {
                setColor(response);
                setColor("");
                setStatus(prevStatus => ({
                    ...prevStatus,
                    color: true
                }));
                setReload((prevState) => !prevState);
                const data = await ProductDetailAPI.getColorProductId(shoes.id)
                setColorList(data)
            }
            alert("Color added successfully!");
        } catch (error) {
            console.error("Error adding new color:", error);
            alert("Failed to add color!");
        }

    }

    return {
        shoes, setShoes,
        genderCategory,
        shoesCategory,
        supplier,
        status, color, setColor , colorList,
        activeCreateBtn, handleCreateProduct, handleCreateDetail,
    };
}

export default ProductNewVM;