import {useState, useEffect, useCallback} from "react";
import SizeAPI from "../api/SizeAPI";
import {stopLoadingWithDelay} from "../utils/Util";

function SizeVM() {
    const [size, setSize] = useState([]);
    const [newSize, setNewSize] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        document.title = "Size";

        const loadSizes = async () => {
            setLoading(true);
            try {
                const data = await SizeAPI.getAllSample();
                setSize(data);
            } catch (error) {
                console.error("Error loading size list:", error);
            } finally {
                stopLoadingWithDelay(setLoading);
            }
        };
        loadSizes();
    }, []);

    const handleSizeSubmit = useCallback(async (event) => {
        event.preventDefault();
        if (!newSize.trim()) {
            alert("Please enter a size!");
            return;
        }

        try {
            const response = await SizeAPI.create({size: newSize});
            setSize(prevSize => [...prevSize, response]);
            setNewSize("");
        } catch (error) {
            console.error("Error creating size:", error);
            alert("Unable to add new size!");
        }
    }, [newSize]);

    const handleSizeDelete = useCallback(async (id) => {
        if (!window.confirm("Are you sure you want to delete?")) return;
        try {
            await SizeAPI.delete(id);
            setSize(prevSize => prevSize.filter((s) => s.id !== id));
        } catch (error) {
            alert("Deletion failed, please try again!");
        }
    }, []);

    return {
        size, loading,
        newSize,
        setNewSize,
        handleSizeSubmit,
        handleSizeDelete,
    };
}

export default SizeVM;
