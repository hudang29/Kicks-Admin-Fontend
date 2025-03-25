import {useEffect, useState} from "react";
import CategoryAPI from "../api/CategoryAPI";
import {stopLoadingWithDelay} from "../utils/Util";

function CategoriesVM() {
    const [loading, setLoading] = useState(true);

    const [genderList, setGenderList] = useState([]);
    const [type, setType] = useState([]);
    const [genderId, setGenderId] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const data = await CategoryAPI.getAllGenderCategory();
                setGenderList(data);
            } catch (error) {
                console.error("Error fetch gender category", error);
            } finally {
                stopLoadingWithDelay(setLoading);
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        const handleGetType = async () => {
            if (!genderId) return;
            try {
                const data = await CategoryAPI.getAllCategoryShoesByGenderId(genderId);
                console.log(data);
                setType(data);
            } catch (error) {
                console.error("Error fetch type category", error);
            }
        }
        handleGetType();
    }, [genderId]);


    return {loading, genderList, type, genderId, setGenderId};
}

export default CategoriesVM;