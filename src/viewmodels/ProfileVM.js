import { useEffect, useState, useCallback } from "react";
import StaffAPI from "../api/StaffAPI";
import StaffModel from "../models/StaffModel";

function ProfileVM() {
    const employeeId = localStorage.getItem("employeeId");

    const [profile, setProfile] = useState(new StaffModel(
        "", "", "", "", "", "", "", "", "", "", "",
    ));

    useEffect(() => {
        document.title = "Home";
    }, []);

    const fetchProfile = useCallback(async () => {
        if (!employeeId) return;
        try {
            const response = await StaffAPI.getById(employeeId);
            setProfile(new StaffModel(
                response?.id, response?.name, response?.email, response?.phone,
                response?.address, response?.role, response?.createAt,
                response?.city, response?.district, response?.ward
            ));
        } catch (error) {
            console.error("Error fetching profile data:", error);
        }
    }, [employeeId]);

    useEffect(() => {
        fetchProfile();
    }, [fetchProfile]);

    return {
        profile, setProfile
    };
}

export default ProfileVM;
