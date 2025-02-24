import logo from "../assets/IconKicks.png";
import {useEffect, useState} from "react";
import CategoryAPI from "../api/CategoryAPI";
import SizeAPI from "../api/SizeAPI";
import SupplierAPI from "../api/SupplierAPI";
import DiscountAPI from "../api/DiscountAPI";

function ProductNew() {

    const [genderCategory, setGenderCategory] = useState([]);
    const [selectedGender, setSelectedGender] = useState("errors");
    const [shoesCategory, setShoesCategory] = useState([]);
    const [selectedShoeType, setSelectedShoeType] = useState(null);
    const [size, setSize] = useState([]);
    const [supplier, setSupplier] = useState([]);
    const [selectedSupplier, setSelectedSupplier] = useState(null);
    const [discount, setDiscount] = useState([]);
    const [selectedDiscount, setSelectedDiscount] = useState("errors");

    const [stock, setStock] = useState(0);
    const handleChangeStock = (e, sizeId) => {
        const value = Number(e.target.value);
        setStock((prevStock) => ({
            ...prevStock,
            [sizeId]: value < 0 ? 0 : value // Không cho số âm
        }));
    };


    useEffect(() => {
        CategoryAPI.getAllGenderCategory()
            .then((data) => {
                //console.log(data);
                setGenderCategory(data); // Lưu danh sách vào state
            })
            .catch((error) => console.error("Lỗi gender", error));
    }, []);

    // Lấy danh sách shoe type khi selectedGender thay đổi
    useEffect(() => {
        if (selectedGender) {
            CategoryAPI.getAllCategoryShoesByGenderId(selectedGender)
                .then((data) => setShoesCategory(data))
                .catch((error) => console.error("Lỗi shoe type", error));
        }
    }, [selectedGender]);

    useEffect(() => {
        SizeAPI.getAllSample()
            .then((data) => {
                console.log(data);
                setSize(data);
            })
            .catch((error) => console.error("Lỗi size", error));
    }, []);

    useEffect(() => {
        SupplierAPI.getAll()
            .then((data) => {
                //console.log(data);
                setSupplier(data); // Lưu danh sách vào state
            })
            .catch((error) => console.error("Lỗi supplier", error));
    }, []);

    useEffect(() => {
        DiscountAPI.getAll()
            .then((data) => {
                console.log(data);
                setDiscount(data);
            })
            .catch((error) => console.error("Lỗi discount", error));
    }, []);

    return (
        <>
            <div className="mb-3">
                <h3>New Product</h3>
                <div className="hstack">
                    <div className="p-1">
                        <nav style={{"--bs-breadcrumb-divider": "'>'"}} aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><a href="#" className="nav-link">Home</a></li>
                                <li className="breadcrumb-item">
                                    <a href="#" className="nav-link d-inline-block">All Products</a>
                                </li>
                                <li className="breadcrumb-item active" aria-current="page">New Product</li>
                            </ol>
                        </nav>
                    </div>

                    <div className="ms-auto">
                        <input
                            type="date"
                            className="form-control"
                            id="selectDate"
                        />
                    </div>
                </div>
            </div>

            <div className="card mb-3 p-3">
                <div className="row g-3">
                    <div className="col-md-8">
                    <form className="row g-3">

                            <div className="col-12">
                                <label htmlFor="name" className="form-label">Product Name</label>
                                <input type="text" className="form-control" id="name"
                                       value={""}/>
                            </div>

                            <div className="col-12">
                                <label htmlFor="exampleFormControlTextarea1" className="form-label">
                                    Description
                                </label>
                                <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"
                                          value={""}/>
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="supplier" className="form-label">Supplier</label>
                                <select className="form-select"
                                        aria-label="Default select example"
                                        id="supplier"
                                        value={selectedSupplier}
                                        onChange={(e) => setSelectedSupplier(e.target.value)}>
                                    <option>Choose Supplier</option>
                                    {
                                        supplier.length > 0 ? (
                                            supplier.map((item) => (
                                                <option key={item.id} value={item.id}>{item.name}</option>
                                            ))
                                        ) : (
                                            <option>Errors</option>
                                        )
                                    }
                                </select>
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="gender" className="form-label">Gender</label>
                                <select className="form-select"
                                        aria-label="Default select example"
                                        id="gender"
                                        value={selectedGender}
                                        onChange={(e) => setSelectedGender(e.target.value)}>
                                    <option value="errors">Choose Gender</option>
                                    {
                                        genderCategory.length > 0 ? (
                                            genderCategory.map((gender) => (
                                                <option key={gender.id} value={gender.id}>{gender.name}</option>
                                            ))
                                        ) : (
                                            <option>Errors</option>
                                        )
                                    }
                                </select>
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="brand" className="form-label">Brand</label>
                                <input type="text" className="form-control" id="brand" value={""}/>
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="shoeType" className="form-label">Shoe type</label>
                                <select className="form-select"
                                        aria-label="Default select example"
                                        id="shoeType"
                                        disabled={selectedGender === "errors"}
                                        value={selectedShoeType}
                                        onChange={(e) => setSelectedShoeType(e.target.value)}>
                                    <option selected>Choose Type</option>
                                    {
                                        shoesCategory.length > 0 ? (
                                            shoesCategory.map((shoe) => (
                                                <option key={shoe.id} value={shoe.id}>{shoe.name}</option>
                                            ))
                                        ) : (
                                            <option>Errors</option>
                                        )
                                    }
                                </select>
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="color" className="form-label">Color</label>
                                <input type="text" className="form-control" id="color"
                                       value={""}/>
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="price" className="form-label">Regular Price</label>
                                <input type="number" className="form-control" id="price" value={''}/>
                            </div>

                            <div className="col-12">
                                <label htmlFor="discount" className="form-label">Discount</label>
                                <select className="form-select"
                                        aria-label="Default select example"
                                        id="discount"
                                        value={selectedDiscount}
                                        onChange={
                                            (e) => setSelectedDiscount(e.target.value)
                                        }>
                                    <option value="errors">0 %</option>
                                    {
                                        discount.length > 0 ? (
                                            discount.map((discount) => (
                                                <option key={discount.id}
                                                        value={discount.id}>{discount.discountRate}</option>
                                            ))
                                        ) : (
                                            <option>Errors</option>
                                        )
                                    }
                                </select>
                                {/*<div className="row" >*/}
                                {/*    <div className="col-md-6 mt-3">*/}
                                {/*        <label htmlFor="discountDateStart" className="form-label">Start</label>*/}
                                {/*        <input*/}
                                {/*            type="date"*/}
                                {/*            className="form-control"*/}
                                {/*            id="discountDateStart"*/}
                                {/*        />*/}
                                {/*    </div>*/}
                                {/*    <div className="col-md-6 mt-3">*/}
                                {/*        <label htmlFor="discountDateEnd" className="form-label">End</label>*/}
                                {/*        <input*/}
                                {/*            type="date"*/}
                                {/*            className="form-control"*/}
                                {/*            id="discountDateEnd"*/}
                                {/*        />*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                            </div>

                            <div className="col-12">
                                <label htmlFor="salePrice" className="form-label">Sale Price</label>
                                <input type="number" className="form-control" id="salePrice" readOnly={true} value={0}/>
                            </div>

                            <div className="col-12">
                                <label htmlFor="size" className="form-label">Size</label>
                                <div className="row row-cols-auto" id="size">
                                    {
                                        size.length > 0 ? (
                                            size.map((size) => (
                                                <div className="col-md-3">
                                                    <div className="input-group mb-3">
                                                        <span className="input-group-text"
                                                              key={size.id}># {size.size}</span>
                                                        <input type="number" className="form-control"
                                                               aria-describedby="basic-addon1"
                                                               onChange={(e) => handleChangeStock(e, size.id)}
                                                               value={stock[size.id] || 0} // Giá trị riêng cho từng size
                                                               min={0}/>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <p>Lỗi</p>
                                        )
                                    }
                                </div>
                            </div>

                            <div className="col-12">
                                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                    <button className="btn btn-dark" type="button">Create</button>
                                    <button className="btn btn-light border border-dark" type="button">Cancel</button>
                                </div>
                            </div>
                        </form>
                    </div>

                    <div className="col-md-4">
                        <img src={logo} className="img-fluid rounded border border-1 border-dark" alt="..."/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductNew;