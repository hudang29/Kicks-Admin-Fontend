import {useEffect, useState, useCallback, useMemo} from "react";
import StaffModel from "../models/StaffModel";
import ProfileAPI from "../api/ProfileAPI";
import {validatePassword} from "../utils/ValidationForm";
import {stopLoadingWithDelay} from "../utils/Util";

function ProfileVM() {
    const [loading, setLoading] = useState(false);
    const employeeId = sessionStorage.getItem("employeeId");

    useEffect(() => {
        document.title = "Home";
    }, []);

    const [profile, setProfile] = useState(new StaffModel(
        "", "", "", "", "", "", "", "", "", "", "",
    ));
    const [errorMessage, setErrorMessage] = useState({
        newPasswordMessage: "Please enter your password",
        confirmPasswordMessage: false,
    });
    const [password, setPassword] = useState({
        employeeId: employeeId,
        oldPassword: "",
        newPassword: "",
    });
    const [confirmPassword, setConfirmPassword] = useState("");

    const fetchProfile = useCallback(async () => {
        setLoading(true);
        if (!employeeId) return;
        try {
            console.log(employeeId);
            const response = await ProfileAPI.getProfile(employeeId);
            console.log(response);
            setProfile(new StaffModel(
                response?.id,
                response?.name,
                response?.email,
                response?.phone,
                response?.address,
                response?.role,
                response?.status,
                response?.createAt,
                response?.city, response?.district, response?.ward
            ));
        } catch (error) {
            console.error("Error fetching profile data:", error);
        } finally {
            stopLoadingWithDelay(setLoading)
        }
    }, [employeeId]);

    useEffect(() => {
        fetchProfile();
    }, [fetchProfile]);

    const handleUpdate = async () => {
        const isConfirmed = window.confirm("Are you sure you want to update?");
        if (!isConfirmed) return;
        const updateStaff = new StaffModel(
            employeeId,
            profile.name,
            profile.email,
            profile.phone,
            profile.address,
            profile.role,
            profile.status,
            profile.createAt,
            profile.city, profile.district, profile.ward
        )
        console.log(updateStaff);
        try {
            const response = await ProfileAPI.updateProfile(updateStaff)
            console.log(response)
            setProfile(prevState => ({...prevState, response}));
            alert("Successful");
        } catch (error){
            console.error("An error occurred while updating data:", error);
            alert("Failed");
        }
    }

    const handleChange = (e) => {
        const value = e.target.value;
        setPassword(prevState => ({
            ...prevState,
            newPassword: value
        }));
        setErrorMessage(prevState => ({
            ...prevState,
            newPasswordMessage: !value ? "Please enter your password" : validatePassword(value)
        }));

    };

    const handleConfirm = (e) => {
        const confirm = e.target.value;
        setConfirmPassword(confirm);
        if (confirm === password.newPassword) {
            setErrorMessage(prevState => ({
                ...prevState,
                confirmPasswordMessage: true,
            }));
        } else {
            setErrorMessage(prevState => ({
                ...prevState,
                confirmPasswordMessage: false,
            }));
        }
    };

    const isDisabled = useMemo(() => {
        return (
            !profile.status ||
            !password.oldPassword ||
            errorMessage.newPasswordMessage ||
            !errorMessage.confirmPasswordMessage
        );
    }, [profile.status, password.oldPassword, errorMessage.newPasswordMessage, errorMessage.confirmPasswordMessage]);

    const handleChangePassword = async () => {
        const isConfirmed = window.confirm("Are you sure you want to change password?");
        if (!isConfirmed) return;
        if(!employeeId) return;
        if (isDisabled) return;
        const check = validatePassword(password.newPassword);
        if (check)
            return;

        try {
            const response = await ProfileAPI.updatePassword(password);
            if(response){
                alert("Successful");
            }else {
                alert("Failed");
            }
        } catch (error){
            console.error("An error occurred while updating data:", error);
            alert("Failed");
        }
    }

    return {
        loading,
        profile, setProfile,
        password, setPassword,
        errorMessage, confirmPassword,
        handleUpdate, handleChangePassword, handleChange, handleConfirm, isDisabled
    };
}

export default ProfileVM;
