import logo from "../assets/IconKicks.png";
import ProductNewVM from "../viewmodels/ProductNewVM";
import {useNavigate} from "react-router-dom";

function ProductNew() {
    const navigate = useNavigate();

    const {
        supplier, selectedSupplier, setSelectedSupplier,
        shoesCategory, selectedShoeType, setSelectedShoeType,
        genderCategory, selectedGender, setSelectedGender,
        productName, description, brand, price, setProductName, setPrice, setDescription, setBrand,
        activeCreateBtn, handleCreateProduct
    } = ProductNewVM();

    return (
        <>
            <div className="my-3">
                <p className="fw-semibold fs-2">New Shoes</p>
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
                                       value={productName}
                                       onChange={(e) => setProductName(e.target.value)}/>
                            </div>

                            <div className="col-12">
                                <label htmlFor="exampleFormControlTextarea1" className="form-label">
                                    Description
                                </label>
                                <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"
                                          value={description}
                                          onChange={(e) => setDescription(e.target.value)}/>
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
                                <input type="text" className="form-control" id="brand" value={brand}
                                       onChange={(e) => setBrand(e.target.value)}/>
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


                            <div className="col-12">
                                <label htmlFor="price" className="form-label">Regular Price</label>
                                <input type="number" className="form-control" id="price" value={price}
                                       onChange={(e) => setPrice(e.target.value)}/>
                            </div>


                            <div className="col-12">
                                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                    <button type="button" className="btn btn-dark"
                                            disabled={!activeCreateBtn()}
                                            onClick={() => handleCreateProduct(navigate)}>Create
                                    </button>
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