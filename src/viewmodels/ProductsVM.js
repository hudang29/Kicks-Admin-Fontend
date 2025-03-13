import { useEffect, useState, useCallback } from "react";
import ProductAPI from "../api/ProductAPI";
import ProductModel from "../models/ProductModel";

function ProductsVM() {
    const [state, setState] = useState({
        page: 0,
        totalPages: 0,
        shoes: [],
    });

    useEffect(() => {
        document.title = "Shoes";
    }, []);

    const fetchData = useCallback(async (page) => {
        const controller = new AbortController();
        try {
            const response = await ProductAPI.getPageProducts(page, { signal: controller.signal });
            setState(prevState => ({
                ...prevState,
                totalPages: response?.totalPages ?? 0,
                shoes: Array.isArray(response?.content) ? response?.content.map(ProductModel.fromJson) : []
            }));
        } catch (error) {
            console.error("Error fetching product data:", error);
        }
    }, []);

    useEffect(() => {
        fetchData(state.page);
    }, [state.page, fetchData]);

    const handleChangePage = useCallback((p) => {
        setState(prevState => ({ ...prevState, page: Number(p) }));
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    return {
        ...state,
        handleChangePage
    };
}

export default ProductsVM;
