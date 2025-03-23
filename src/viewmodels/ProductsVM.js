import {useEffect, useState, useCallback} from "react";
import ProductAPI from "../api/ProductAPI";
import ProductModel from "../models/ProductModel";
import {stopLoadingWithDelay} from "../utils/Util";

function ProductsVM() {

    const [loading, setLoading] = useState(false);

    const [state, setState] = useState({
        page: 0,
        totalPages: 0,
        shoes: [],
    });
    const [filteredData, setFilteredData] = useState({
        name: "",
        brand: "",
        sortBy: "",
        minPrice: "",
        maxPrice: "",
    });

    useEffect(() => {
        document.title = "Shoes";
    }, []);

    const fetchData = useCallback(async () => {
        setLoading(true);
        const controller = new AbortController();
        try {
            const response = await ProductAPI.getPageProducts(0, {signal: controller.signal});
            setState(prevState => ({
                ...prevState,
                totalPages: response?.totalPages ?? 0,
                shoes: Array.isArray(response?.content) ? response?.content.map(ProductModel.fromJson) : []
            }));
        } catch (error) {
            console.error("Error fetching product data:", error);
        } finally {
            stopLoadingWithDelay(setLoading)
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleFindProduct = useCallback(async () => {
        setLoading(true);
        try {
            const response = await ProductAPI.findProduct(state.page, filteredData.name, filteredData.brand,
                filteredData.sortBy, filteredData.minPrice, filteredData.maxPrice);

            //console.log(response.content);

            setState(prevState => ({
                ...prevState,
                totalPages: response?.totalPages ?? 0,
                shoes: Array.isArray(response?.content) ? response?.content.map(ProductModel.fromJson) : []
            }));
        } catch (error) {
            console.error("Error finding product data:", error);
        } finally {
            stopLoadingWithDelay(setLoading, 600);
        }
    }, [filteredData.brand, filteredData.maxPrice, filteredData.minPrice, filteredData.name, filteredData.sortBy, state.page]);

    useEffect(() => {
        handleFindProduct();
    }, [handleFindProduct]);


    const handleChangePage = useCallback((p) => {
        setState(prevState => ({...prevState, page: Number(p)}));
        window.scrollTo({top: 0, behavior: "smooth"});
    }, []);

    return {
        ...state, loading, filteredData, setFilteredData,
        handleChangePage, handleFindProduct,
    };
}

export default ProductsVM;
