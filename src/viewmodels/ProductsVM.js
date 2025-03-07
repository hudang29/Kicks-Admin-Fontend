import {useEffect, useState} from "react";
import ProductAPI from "../api/ProductAPI";
import ProductModel from "../models/ProductModel";

function ProductsVM() {
    const [state, setState] = useState({
        page: 0,
        totalPages: 0,
        shoes: [],
    });

    useEffect(() => {
        document.title = "Products";
    }, []);
    useEffect(() => {
        const controller = new AbortController();
        const fetchData = async () => {
            const response = await ProductAPI.getPageProducts(state.page, {signal: controller.signal})
            setState(prevState => ({
                ...prevState,
                shoes: response.content.map(ProductModel.fromJson),
                totalPages: response.totalPages
            }));
        }
        fetchData();
    }, [state.page])
    const handleChangePage = async (p) => {
        setState(prevState => ({...prevState,
            page: Number(p)}));
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
    return {
        ...state,
        handleChangePage
    };
}
export default ProductsVM;