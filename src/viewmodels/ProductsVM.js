import {useEffect, useState} from "react";
import ProductAPI from "../api/ProductAPI";

function ProductsVM() {
    const [products, setProducts] = useState([]); // State lưu danh sách người dùng

    // Cập nhật document.title
    useEffect(() => {
        document.title = "Products";
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await ProductAPI.getAll();
                setProducts(data);
            } catch (error) {
                console.error("Lỗi khi lấy danh sách sản phẩm:", error);
            }
        };

        fetchProducts();
    }, []);


    return products;
}

export default ProductsVM;