import {Link} from "react-router-dom";
import List from "../components/List";
import SupplierVM from "../viewmodels/SupplierVM";
import LoadingPage from "../components/LoadingPage";

const TableSupplier = ["No.", "Name", "Address", "Contact info", "Action"];

function Supplier() {

    const {
        supplierList, loading, supplier, setSupplier,
        handleCreate
    } = SupplierVM();

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
                            data-bs-target="#staticBackdrop">
                        Create Supplier
                    </button>

                    <div className="modal fade" id="staticBackdrop"
                         data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1"
                         aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal"
                                            aria-label="Close"></button>
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
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close
                                    </button>
                                    <button type="button" className="btn btn-primary"
                                            onClick={handleCreate}>Create
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr/>
            </div>


            <List
                items={TableSupplier}
                information={supplierList}
                CardName={""}
            />
        </>
    );
}

export default Supplier;