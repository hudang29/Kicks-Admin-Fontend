import {useEffect, useState} from "react";
import ProductAPI from "../api/ProductAPI";
import CategoryAPI from "../api/CategoryAPI";

function ProductsVM() {
    const [products, setProducts] = useState([]);


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