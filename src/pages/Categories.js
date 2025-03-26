import CategoriesVM from "../viewmodels/CategoriesVM";
import LoadingPage from "../components/LoadingPage";
import List from "../components/List";
import {Link} from "react-router-dom";

const TableCategory = ["No.", "Name", "Action"];

function Categories() {

    const {
        type, loading,
        genderId, setGenderId, genderList,
        gender, setGender, typeId, setTypeId, shoesType, setShoesType,
        handleCreateGender, handleCreateType,
    } = CategoriesVM();

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
                            data-bs-target="#staticBackdrop"
                            onClick={() => setShoesType({
                                id: "",
                                name: "",
                                genderCategoryID: "",
                            })}>
                        Create type
                    </button>

                    <div className="modal fade" id="staticBackdrop"
                         data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1"
                         aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="staticBackdropLabel">Shoes Category</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal"
                                            aria-label="Close"
                                            onClick={() => setTypeId("")}></button>
                                </div>
                                <div className="modal-body">
                                    <div className="row g-3">
                                        <div className="col-6">
                                            <input type="text" className="form-control" placeholder="Name"
                                                   aria-label="Name"
                                                   value={shoesType.name}
                                                   onChange={(e) =>
                                                       setShoesType(prevState => ({
                                                           ...prevState,
                                                           name: e.target.value
                                                       }))}/>
                                        </div>
                                        <div className="col-6">
                                            <select className="form-select" aria-label="Default select example"
                                                    value={shoesType.genderCategoryID}
                                                    onChange={(e) =>
                                                        setShoesType(prevState => ({
                                                            ...prevState,
                                                            genderCategoryID: e.target.value
                                                        }))}>
                                                <option selected>Select gender</option>
                                                {
                                                    genderList?.map(item => (
                                                        <option value={item.id}>{item.name}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>

                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal"
                                            onClick={() => setTypeId("")}>Close
                                    </button>
                                    <button type="button" className="btn btn-primary"
                                            onClick={handleCreateType}
                                            disabled={typeId}
                                            hidden={typeId}>Create
                                    </button>
                                    <button type="button" className="btn btn-primary"
                                            disabled={!typeId}
                                            hidden={!typeId}>Update
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <hr/>
            </div>

            <form className="row row-cols-lg-auto g-3 align-items-center mb-3">
                <div className="col-12">
                    <label className="visually-hidden" htmlFor="inlineFormInputGroupUsername">Gender</label>
                    <div className="input-group">
                        <div className="input-group-text">Gender</div>
                        <input type="text" className="form-control" id="inlineFormInputGroupUsername"
                               value={gender}
                               onChange={(e) => setGender(e.target.value)}/>
                    </div>
                </div>
                <div className="col-12">
                    <button type="button" className="btn btn-kicks-dark">Create Gender</button>
                </div>
            </form>


            <div className="table-responsive">
                <table className="table table-hover">
                    <thead>
                    <tr>
                        <th scope="col">No</th>
                        <th scope="col">Name</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {type?.map((type, index) => (
                        <tr>
                            <th scope="row">{index + 1}</th>
                            <td>{type.name}</td>
                            <td>
                                <button type="button" className="btn btn-danger w-auto"
                                        data-bs-toggle="modal"
                                        data-bs-target="#staticBackdrop"
                                        onClick={() => setTypeId(type.id)}>
                                    Update
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/*<div className="w-75 mx-auto">*/}
            {/*    {genderId && (*/}
            {/*        <List*/}
            {/*            items={TableCategory}*/}
            {/*            information={type}*/}
            {/*            CardName={""}*/}
            {/*        />*/}
            {/*    )}*/}
            {/*</div>*/}
        </>
    );
}

export default Categories;