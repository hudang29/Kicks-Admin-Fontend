import {useEffect, useState} from "react";
import StaffAPI from "../api/StaffAPI";
import {useParams} from "react-router-dom";
import axios from "axios";
import StaffModel from "../models/StaffModel";

function StaffsVM() {
    const {id} = useParams();
    const employeeId = sessionStorage.getItem("employeeId");

    const [staffList, setStaffList] = useState([]);
    const [staff, setStaff] = useState({
        id: null,
        name: "",
        email: "",
        phone: "",
        address: "",
        role: "Staff",
        status: "",
        createAt: "",
        city: "No Province",
        district: "No District",
        ward: "No Ward",
    });
    const [password, setPassword] = useState(false);

    useEffect(() => {
        document.title = "Staffs";
        const fetchStaffs = async () => {
            try {
                const data = await StaffAPI.getAll();
                setStaffList(data);
            } catch (error) {
                console.error("An error occurred while loading data:", error);
            }
        };
        fetchStaffs();
    }, []);

    useEffect(() => {
        document.title = "Staff Detail";
        if (!id) return;
        const fetchStaff = async () => {
            try {
                const staffData = await StaffAPI.getById(id);
                setStaff(prevStaff => ({
                    ...prevStaff,
                    ...staffData,
                }));
                const response = await StaffAPI.checkPasswordExists(id);
                setPassword(response);
            } catch (error) {
                console.error("An error occurred while loading data:", error);
            }
        }
        fetchStaff();
    }, [id, staff.status]);

    const [profile, setProfile] = useState(new StaffModel(
        "", "", "", "", "", "", "", "", "", "", "",
    ));

    useEffect(() => {
        const fetchProfile = async () => {
            if (!employeeId) return;
            const response = await StaffAPI.getById(employeeId);
            console.log(response);
            setProfile(new StaffModel(
                response.id, response.name, response.email, response.phone,
                response.address, response.role, response.status, response.createAt,
                response.city, response.district, response.ward
            ));
        }
        fetchProfile();
    }, [employeeId])

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
        const isConfirmed = window.confirm("Are you sure you want to update?");
        if (!isConfirmed) return;
        const updateStaff = {
            id: id ?? employeeId,
            name: staff.name ?? profile.name,
            email: staff.email ?? profile.email,
            phone: staff.phone ?? profile.phone,
            role: staff.role ?? profile.role,
            address: staff.address ?? profile.address,
            city: staff.city ?? profile.city,
            district: staff.district ?? profile.district,
            ward: staff.ward ?? profile.ward,
        };
        await StaffAPI.update(updateStaff);
        let updatedStaff;
        if (id) {
            updatedStaff = await StaffAPI.getById(id);
        } else
            updatedStaff = await StaffAPI.getById(employeeId);
        setStaff(updatedStaff);
        alert("Successful");
    }

    const handleResetData = async () => {
        try {
            const staffData = await StaffAPI.getById(id);
            setStaff(prevStaff => ({
                ...prevStaff,
                ...staffData,
            }));
        } catch (error) {
            console.error("An error occurred while reset data:", error);
        }
    }

    const handleStatus = async () => {
        const isConfirmed = window.confirm("Are you sure you want to change?");
        if (!isConfirmed) {
            return; // Nếu người dùng nhấn "Hủy", không tiếp tục cập nhật
        }
        try {
            const updatedStatus = !staff.status;
            await StaffAPI.changeStatus({id: id, status: updatedStatus});

            setStaff(prevStaff => ({
                ...prevStaff,
                status: updatedStatus,
            }));

            alert("Successful");
        } catch (error) {
            console.error("An error occurred while change status:", error);
            alert("Operation failed!");
        }
    }

    const handleCreate = async () => {
        const isConfirmed = window.confirm(`Are you sure you want to create this information about ${staff.name}?`);
        if (!isConfirmed) {
            return;
        }
        try {
            const newStaff = {
                name: staff.name,
                email: staff.email,
                phone: staff.phone,
                role: staff.role,
                address: staff.address,
                city: staff.city,
                district: staff.district,
                ward: staff.ward,
            }
            console.log(newStaff);
            const response = await StaffAPI.create(newStaff);
            console.log(response.data);
            alert(`Successful`);
        } catch (error) {
            console.error("An error occurred while loading data:", error);
            alert("Operation failed!");

        }
    }

    const handleCreatePassword = async () => {
        const staffData = await StaffAPI.getById(id);
        const isConfirmed = window
            .confirm(`Are you sure you want to create password for ${staffData.name}?\nTo Email address ${staffData.email}?`);
        if (!isConfirmed) {
            return;
        }
        try {
            const staffEmail = {
                email: staffData.email,
            }
            await StaffAPI.createPassword(staffEmail);
        } catch (e) {
            console.error("An error occurred while create:", e);
            alert("Operation failed!");

        }
    }

    const activeBtn = () => {
        const requiredFields = ["name", "email", "phone", "address", "role", "city", "district", "ward"];
        return requiredFields.every(field => (
            staff[field] !== "" && staff[field] !== null &&
            staff[field] !== "No Province" && staff[field] !== "No District" && staff[field] !== "No Ward"
        ));
    }

    return {
        id, profile, setProfile,
        staffList, staff, setStaff,
        password, setPassword,
        provinces, selectedProvince, setSelectedProvince,
        districts, selectedDistrict, setSelectedDistrict,
        wards, selectedWard, setSelectedWard,
        handleUpdate, handleStatus, activeBtn,
        handleCreate, handleCreatePassword, handleResetData,
    };
}

export default StaffsVM;