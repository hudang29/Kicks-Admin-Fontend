import {useEffect, useState} from "react";
import {stopLoadingWithDelay} from "../utils/Util";
import SupplierAPI from "../api/SupplierAPI";
import SupplierModel from "../models/SupplierModel";

function SupplierVM() {
    const [loading, setLoading] = useState(true);
    const [supplierList, setSupplierList] = useState([]);
    const [supplier, setSupplier] = useState(new SupplierModel("", "", "", ""));
    const [supplierId, setSupplierId] = useState("");

    useEffect(() => {
        document.title = "Supplier";
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

    useEffect(() => {
        const fetchSupplierById = async () => {
            if (!supplierId) return;
            try {
                const data = await SupplierAPI.getById(supplierId);
                setSupplier(new SupplierModel(data.id, data.name, data.address, data.contactInfo));
            } catch (error) {
                console.error("Error loading Supplier", error);
            }
        }
        fetchSupplierById();
    }, [supplierId]);

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
            alert("successfully created Supplier");
        } catch (error) {
            console.error("Error creating Supplier", error);
            alert("Error creating Supplier");
        }
    }

    const handleUpdate = async () => {
        const confirm = window.confirm("Are you sure?");
        if (!confirm) return;
        if (!supplierId) {
            alert("Not found supplier");
            return;
        }
        try {
            const data = {
                id: supplierId,
                name: supplier.name,
                address: supplier.address,
                contactInfo: supplier.contactInfo,
            }
            const response = await SupplierAPI.update(data)
            setSupplierList(prevState => (
                prevState.map(item => item.id === supplierId ? response : item)));
            console.log(response);
        } catch (error) {
            console.error("Error updating Supplier", error);
            alert("Error updating Supplier");
        }
    }

    return {
        supplierList, loading, supplier, setSupplier, setSupplierId, supplierId,
        handleCreate, handleUpdate,
    };
}

export default SupplierVM;