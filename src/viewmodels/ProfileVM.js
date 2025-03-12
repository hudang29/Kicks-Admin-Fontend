import {useEffect, useState} from "react";
import StaffAPI from "../api/StaffAPI";
import StaffModel from "../models/StaffModel";

function ProfileVM() {
    // const [state, setState] = useState({
    //     page: 0,
    //     totalPages: 0,
    //     shoes: [],
    // });
    const employeeId = localStorage.getItem("employeeId");

    const [profile, setProfile] = useState(new StaffModel(
        "", "", "", "", "", "", "", "", "", "", "",
    ));

    useEffect(() => {
        document.title = "Home";
    }, []);
    useEffect(() => {
        if (!employeeId) return;
        const response = StaffAPI.getById(employeeId);
        setProfile(new StaffModel(
            response?.id, response?.name, response?.email, response?.phone,
            response?.address, response?.role, response?.createAt,
            response?.city, response?.district, response?.ward
        ));

    }, [employeeId])

    return {
        profile, setProfile
    };
}

export default ProfileVM;