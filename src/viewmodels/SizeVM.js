import {useState, useEffect} from "react";
import SizeAPI from "../api/SizeAPI";

function SizeVM() {
    const [size, setSize] = useState([]);
    const [newSize, setNewSize] = useState("");

    useEffect(() => {
        document.title = "Size";

        const loadSizes = async () => {
            try {
                const data = await SizeAPI.getAllSample();
                setSize(data);
            } catch (error) {
                console.error("Lỗi khi tải danh sách size:", error);
            }
        };
        loadSizes();
    }, []);

    const handleSizeSubmit = async (event) => {
        event.preventDefault();
        if (!newSize.trim()) {
            alert("Vui lòng nhập size!");
            return;
        }

        try {
            const response = await SizeAPI.create({size: newSize});
            setSize([...size, response]);
            setNewSize("");
        } catch (error) {
            console.error("Lỗi khi tạo size:", error);
            alert("Không thể thêm size mới!");
        }
    };

    const handleSizeDelete = async (id) => {
        if (!window.confirm("Bạn có chắc chắn muốn xóa?")) return;
        try {
            await SizeAPI.delete(id);
            setSize(size.filter((s) => s.id !== id));
        } catch (error) {
            alert("Xóa không thành công, vui lòng thử lại!");
        }
    };

    return {
        size,
        newSize,
        setNewSize,
        handleSizeSubmit,
        handleSizeDelete,
    };
}

export default SizeVM;
