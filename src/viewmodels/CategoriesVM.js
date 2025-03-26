import {useEffect, useState} from "react";
import CategoryAPI from "../api/CategoryAPI";
import {stopLoadingWithDelay} from "../utils/Util";

function CategoriesVM() {
    const [loading, setLoading] = useState(true);

    const [genderList, setGenderList] = useState([]);
    const [type, setType] = useState([]);
    const [genderId, setGenderId] = useState("");
    const [typeId, setTypeId] = useState("");
    const [gender, setGender] = useState("");
    const [shoesType, setShoesType] = useState({
        id: "",
        name: "",
        genderCategoryID: "",
    });

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
        const handleGetTypeList = async () => {
            if (!genderId) return;
            try {
                const data = await CategoryAPI.getAllCategoryShoesByGenderId(genderId);
                setType(data);
            } catch (error) {
                console.error("Error fetch type category", error);
            }
        }
        handleGetTypeList();
    }, [genderId]);

    useEffect(() => {
        const handleGetType = async () => {
            if (!typeId) return;
            try {
                const data = await CategoryAPI.getShoesCategoryById(typeId);
                setShoesType(data);
            } catch (error) {
                console.error("Error fetch type category", error);
            }
        }
        handleGetType();
    }, [typeId]);
    
    const handleCreateGender = async () => {
        const  confirm = window.confirm("Are you sure you want to create gender?");
        if (!confirm) return;
        if (!gender) return;
        try {
            const response = await CategoryAPI.createGenderCategory(gender);
            setGenderList( prevState => ([
                ...prevState,
                response,
            ]));
            alert("Successfully created gender category");
        } catch (error) {
            console.error("Error creating gender category", error);
            alert("Error creating gender category");
        }
    }

    const handleCreateType = async () => {
        const  confirm = window.confirm("Are you sure you want to create gender?");
        if (!confirm) return;
        if (!gender) return;
        try {
            const response = await CategoryAPI.createShoesCategory(shoesType);
            setGenderList( prevState => ([
                ...prevState,
                response,
            ]));
            alert("Successfully created gender category");
        } catch (error) {
            console.error("Error creating gender category", error);
            alert("Error creating gender category");
        }
    }


    return {
        loading, genderList, type,
        genderId, setGenderId,
        gender, setGender, typeId, setTypeId, shoesType, setShoesType,
        handleCreateType, handleCreateGender,
    };
}

export default CategoriesVM;