import CategoriesVM from "../viewmodels/CategoriesVM";
import LoadingPage from "../components/LoadingPage";
import List from "../components/List";
import {Link} from "react-router-dom";

const TableCategory = ["No.", "Name", "Action"];

function Categories() {

    const {gender, type, genderId, setGenderId, loading, genderList} = CategoriesVM();

    return (
        <>
            <LoadingPage
                props={loading}/>
            <div className="my-2">
                <p className="fw-semibold fs-2 mb-1">Categories</p>
                <div className="d-flex align-items-center mt-0">
                    <div className="">
                        <nav style={{"--bs-breadcrumb-divider": "'>'"}} aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><Link to="#" className="nav-link">Home</Link></li>
                                <li className="breadcrumb-item active" aria-current="page">Categories</li>
                            </ol>
                        </nav>
                    </div>
                </div>

                <div className="d-flex mb-3">
                    <select className="form-select w-auto" aria-label="Default select example"
                            value={genderId}
                            onChange={(e) => setGenderId(e.target.value)}>
                        <option selected>Select gender</option>
                        {
                            genderList?.map(item => (
                                <option value={item.id}>{item.name}</option>
                            ))
                        }
                    </select>

                    <button type="button" className="btn btn-kicks-dark w-auto ms-auto"
                            data-bs-toggle="modal"
                            data-bs-target="#staticBackdrop">
                        Generate
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
                                            <input type="text" className="form-control" placeholder="Theme"
                                                   aria-label="Theme"/>
                                        </div>
                                        <div className="col-12">
                                        <textarea className="form-control" id="exampleFormControlTextarea1"
                                                  rows="3"
                                                  placeholder="Description"
                                                  aria-label="Description"></textarea>
                                        </div>
                                        <div className="col-6">
                                            <input type="text" className="form-control" placeholder="Limit"
                                                   aria-label="Limit"/>
                                        </div>
                                        <div className="col-6">
                                            <input type="text" className="form-control" placeholder="Rate"
                                                   aria-label="Rate"/>
                                        </div>
                                        <div className="col-6">
                                            <input type="date" className="form-control"/>
                                        </div>
                                        <div className="col-6">
                                            <input type="date" className="form-control"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close
                                    </button>
                                    <button type="button" className="btn btn-primary">Understood</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <hr/>
            </div>


            <div className="w-75 mx-auto">
                {genderId && (
                    <List
                        items={TableCategory}
                        information={type}
                        CardName={""}
                    />
                )}
            </div>
        </>
    );
}

export default Categories;