import {useEffect, useState} from "react";
import StaffAPI from "../api/StaffAPI";
import {useParams} from "react-router-dom";
import axios from "axios";

function StaffsVM() {
    const {id} = useParams();
    const [staffList, setStaffList] = useState([]);
    const [staff, setStaff] = useState({});

    // const [initialData, setInitialData] = useState({
    //     name: null,
    //     email: null,
    //     phone: null,
    //     address: null,
    //     role: null,
    //     status: null,
    // });

    const [staffName, setStaffName] = useState(null);
    const [email, setEmail] = useState(null);
    const [phone, setPhone] = useState(null);
    const [address, setAddress] = useState(null);
    const [selectedRole, setSelectedRole] = useState("Nhân viên");
    const [status, setStatus] = useState(null);
    const [password, setPassword] = useState(null);

    const fetchStaffs = async () => {
        try {
            const data = await StaffAPI.getAll();
            setStaffList(data);
        } catch (error) {
            console.error("Lỗi khi lấy danh sách nhân viên:", error);
        }
    };


    useEffect(() => {
        document.title = "Staffs"; // Cập nhật tiêu đề
        fetchStaffs();
    }, []);

    useEffect(() => {
        if (!id) return;
        const fetchStaff = async () => {
            try {
                const staffData = await StaffAPI.getById(id);
                setStaff(staffData);

                setStaffName(staffData.name);
                setEmail(staffData.email);
                setPhone(staffData.phone);
                setAddress(staffData.address);
                setSelectedRole(staffData.role);
                setStatus(staffData.status);

            } catch (error) {
                console.error("Lỗi khi tải dữ liệu:", error);
            }
        }
        fetchStaff();
    }, [id, status]);

    const [provinces, setProvinces] = useState([]);
    const [selectedProvince, setSelectedProvince] = useState("");
    const [districts, setDistricts] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [wards, setWards] = useState([]);
    const [selectedWard, setSelectedWard] = useState("");

    useEffect(() => {
        const fetchProvinces = async () => {
            try {
                const response = await axios.get("https://provinces.open-api.vn/api/p/");
                setProvinces(response.data);
            } catch (error) {
                console.error("Lỗi tải tỉnh/thành:", error);
            }
        };
        fetchProvinces();
    }, []);

    useEffect(() => {
        if (!selectedProvince) return;

        const fetchDistricts = async () => {
            try {
                const response = await axios
                    .get(`https://provinces.open-api.vn/api/p/${selectedProvince}?depth=2`);
                setDistricts(response.data.districts);
            } catch (error) {
                console.error("Lỗi tải quận/huyện:", error);
            }
        };

        fetchDistricts();
    }, [selectedProvince]);

    useEffect(() => {
        if (!selectedDistrict) return;

        const fetchWards = async () => {
            try {
                const response = await axios
                    .get(`https://provinces.open-api.vn/api/d/${selectedDistrict}?depth=2`);
                setWards(response.data.wards);
            } catch (error) {
                console.error("Lỗi tải phường/xã:", error);
            }
        };

        fetchWards();
    }, [selectedDistrict]);


    const handleUpdate = async () => {
        const isConfirmed = window.confirm("Bạn có muốn cập nhật thông tin nhân viên này?");
        if (!isConfirmed) {
            return; // Nếu người dùng nhấn "Hủy", không tiếp tục cập nhật
        }

        const updateStaff = {
            id: id,
            phone: phone,
            selectedRole: selectedRole,
            name: staffName,
            email: email,
        }

        const updateResult = await StaffAPI.update(updateStaff);
        console.log(updateResult);

        alert("Cập nhật thành công!");
    }

    const handleStatus = async () => {
        const isConfirmed = window.confirm("Bạn có muốn thay đổi trạng thái của nhân viên này?");
        if (!isConfirmed) {
            return; // Nếu người dùng nhấn "Hủy", không tiếp tục cập nhật
        }
        const updatedStatus = !status;
        await StaffAPI.changeStatus({id: staff.id, status: updatedStatus});

        alert("Cập nhật thành công!");

        // Cập nhật state ngay lập tức
        setStatus(updatedStatus);

        // Gọi lại API để lấy dữ liệu mới
        //fetchStaff();
    }

    const handleCreate = async () => {
        const isConfirmed = window.confirm("Bạn có muốn tạo mói thông tin của nhân viên này?");
        if (!isConfirmed) {
            return;
        }
        try {
            const newStaff = {
                phone: phone,
                selectedRole: selectedRole,
                name: staffName,
                email: email,
            }
            await StaffAPI.create(newStaff);
            alert("thành công!");
        } catch (error) {
            console.error("Lỗi khi tải dữ liệu:", error);
            alert("Thất bại!");
        }
    }

    const activeBtn = () => {
        return (
            phone && email && staffName);
    }

    return {
        staffList, staff,
        staffName, setStaffName, email, setEmail, phone, setPhone,
        setAddress, address, setSelectedRole, selectedRole, setStatus, status,
        password, setPassword,
        provinces, selectedProvince, setSelectedProvince,
        districts, selectedDistrict, setSelectedDistrict,
        wards, selectedWard, setSelectedWard,
        handleUpdate, handleStatus, activeBtn
    };
}

export default StaffsVM;