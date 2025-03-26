import {Link} from "react-router-dom";
import SupplierVM from "../viewmodels/SupplierVM";
import LoadingPage from "../components/LoadingPage";
import SupplierModel from "../models/SupplierModel";


function Supplier() {

    const {
        supplierList, loading, supplier, setSupplier,
        setSupplierId, supplierId,
        handleCreate, handleUpdate,
    } = SupplierVM();

    console.log(supplierList);
    return (
        <>
            <LoadingPage props={loading}/>
            <div className="my-2">
                <p className="fw-semibold fs-2 mb-1">Supplier</p>
                <div className="d-flex align-items-center mt-0">
                    <nav style={{"--bs-breadcrumb-divider": "'>'"}} aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/profile" className="nav-link">Home</Link>
                            </li>
                            <li className="breadcrumb-item active" aria-current="page">Supplier</li>
                        </ol>
                    </nav>
                </div>

                <div className="d-flex">

                    <button type="button" className="btn btn-kicks-dark w-auto ms-auto"
                            data-bs-toggle="modal"
                            data-bs-target="#staticBackdrop"
                            onClick={() => (
                                    setSupplier(new SupplierModel("", "", "", "")))}>
                        Create Supplier
                    </button>

                    <div className="modal fade" id="staticBackdrop"
                         data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1"
                         aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="staticBackdropLabel">New supplier</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal"
                                            aria-label="Close"
                                            onClick={() => setSupplierId("")}></button>
                                </div>
                                <div className="modal-body">
                                    <div className="row g-3">
                                        <div className="col-12">
                                            <input type="text" className="form-control" placeholder="Name"
                                                   aria-label="Name"
                                                   value={supplier.name}
                                                   onChange={(e) =>
                                                       setSupplier(prevState =>
                                                           ({
                                                               ...prevState,
                                                               name: e.target.value
                                                           }))}/>
                                        </div>
                                        <div className="col-12">
                                            <input type="text" className="form-control" placeholder="Address"
                                                   aria-label="Address"
                                                   value={supplier.address}
                                                   onChange={(e) =>
                                                       setSupplier(prevState =>
                                                           ({
                                                               ...prevState,
                                                               address: e.target.value
                                                           }))}/>
                                        </div>
                                        <div className="col-12">
                                            <input type="text" className="form-control" placeholder="Contact Info"
                                                   aria-label="Contact Info"
                                                   value={supplier.contactInfo}
                                                   onChange={(e) =>
                                                       setSupplier(prevState =>
                                                           ({
                                                               ...prevState,
                                                               contactInfo: e.target.value
                                                           }))}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"
                                            onClick={() => setSupplierId("")}>Close
                                    </button>
                                    <button type="button" className="btn btn-primary"
                                            disabled={supplierId}
                                            hidden={supplierId}
                                            onClick={handleCreate}>Create
                                    </button>
                                    <button type="button" className="btn btn-primary"
                                            disabled={!supplierId}
                                            hidden={!supplierId}
                                            onClick={handleUpdate}>Update
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr/>
            </div>

            <div className="table-responsive">
                <table className="table table-hover">
                    <thead>
                    <tr>
                        <th scope="col">No</th>
                        <th scope="col">Name</th>
                        <th scope="col">Address</th>
                        <th scope="col">Contact info</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {supplierList?.map((sup, index) => (
                        <tr>
                            <th scope="row">{index + 1}</th>
                            <td>{sup.name}</td>
                            <td>{sup.address}</td>
                            <td>{sup.contactInfo}</td>
                            <td>
                                <button type="button" className="btn btn-kicks-dark w-auto ms-auto"
                                        data-bs-toggle="modal"
                                        data-bs-target="#staticBackdrop"
                                        onClick={() => setSupplierId(sup.id)}>
                                    Update
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Supplier;