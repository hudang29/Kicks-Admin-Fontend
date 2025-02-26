import {useEffect, useState} from "react";
import StaffAPI from "../api/StaffAPI";

function StaffsVM() {
    const [staff, setStaff] = useState([]);

    useEffect(() => {
        document.title = "Staffs"; // Cập nhật tiêu đề

        const fetchStaffs = async () => {
            try {
                const data = await StaffAPI.getAll();
                setStaff(data);
            } catch (error) {
                console.error("Lỗi khi lấy danh sách nhân viên:", error);
            }
        };

        fetchStaffs();
    }, []);

    return {staff};
}

export default StaffsVM;