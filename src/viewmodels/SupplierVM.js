import Supplier from "../pages/Supplier";
import {useEffect, useState} from "react";
import {stopLoadingWithDelay} from "../utils/Util";
import SupplierAPI from "../api/SupplierAPI";
import SupplierModel from "../models/SupplierModel";

function SupplierVM() {
    const [loading, setLoading] = useState(true);
    const [supplierList, setSupplierList] = useState([]);
    const [supplier, setSupplier] = useState(new SupplierModel("", "", "", ""));

    useEffect(() => {
        const fetchSupplier = async () => {
            setLoading(true);
            try {
                const data = await SupplierAPI.getAll();
                setSupplierList(data);
            } catch (error) {
                console.error("Error loading Supplier", error);
                setSupplierList([]);
            } finally {
                stopLoadingWithDelay(setLoading);
            }
        }
        fetchSupplier();
    }, []);

    const handleCreate = async () => {
        const confirm = window.confirm("Are you sure?");
        if (!confirm) return;
        try {
            const data = {
                name: supplier.name,
                address: supplier.address,
                contactInfo: supplier.contactInfo,
            }
            const response = await SupplierAPI.create(data);
            setSupplierList(prevState => ([
                ...prevState,
                response,
            ]))
        } catch (error) {
        }
    }
    return {
        supplierList, loading, supplier, setSupplier,
        handleCreate
    };
}

export default SupplierVM;