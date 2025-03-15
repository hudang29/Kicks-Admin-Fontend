import logo from "../assets/IconKicks.png";
import ProductNewVM from "../viewmodels/ProductNewVM";
import {Link, useNavigate} from "react-router-dom";

function ProductNew() {
    //const navigate = useNavigate();

    const {
        detailId, setDetailId,
        shoes, setShoes, status, listDetail, image, setImage,
        supplier, shoesCategory, genderCategory, color, setColor, colorList,
        setPicture, galleryList, sizeSample, stockData, shoesSize,
        handleCreateProduct, handleCreateDetail, handleUpload, handleChangeStockSample,
        handleCreateSize,
    } = ProductNewVM();

    return (
        <>
            <div className="my-2">
                <p className="fw-semibold fs-2 mb-1">New Shoes</p>
                <div className="d-flex align-items-center mt-0">
                    <div className="">
                        <nav style={{"--bs-breadcrumb-divider": "'>'"}} aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><Link to="#" className="nav-link">Home</Link></li>
                                <li className="breadcrumb-item active" aria-current="page">New Shoes</li>
                            </ol>
                        </nav>
                    </div>
                </div>
                <hr/>
            </div>

            <div className="card mb-3 p-3 rounded rounded-0">
                <div className="accordion accordion-flush" id="accordionPanelsStayOpenExample">
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button bg-body" type="button" data-bs-toggle="collapse"
                                    data-bs-target="#shoesInfo" aria-expanded="true"
                                    aria-controls="shoesInfo">
                                <span className="fw-semibold">
                                    <i className={`bi bi-check-circle-fill me-2 fs-4 ${status.shoes ? "text-success" : ""}`}></i>
                                    Shoes info
                                </span>
                            </button>
                        </h2>
                        <div id="shoesInfo" className="accordion-collapse collapse show ">
                            <div className="accordion-body bg-body">
                                <form className="row g-3 w-75 mx-auto">

                                    <div className="col-12">
                                        <label htmlFor="name" className="form-label">Product Name</label>
                                        <input type="text" className="form-control" id="name"
                                               value={shoes.name}
                                               onChange={(e) => setShoes(
                                                   (prevShoes) => ({
                                                       ...prevShoes,
                                                       name: e.target.value,
                                                   }))}/>
                                    </div>

                                    <div className="col-12">
                                        <label htmlFor="exampleFormControlTextarea1" className="form-label">
                                            Description
                                        </label>
                                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"
                                                  value={shoes.description}
                                                  onChange={(e) => setShoes(
                                                      (prevShoes) => ({
                                                          ...prevShoes,
                                                          description: e.target.value,
                                                      }))}/>
                                    </div>

                                    <div className="col-md-6">
                                        <label htmlFor="supplier" className="form-label">Supplier</label>
                                        <select className="form-select"
                                                aria-label="Default select example"
                                                id="supplier"
                                                value={shoes.supplierID}
                                                onChange={(e) => setShoes(
                                                    (prevShoes) => ({
                                                        ...prevShoes,
                                                        supplierID: e.target.value,
                                                    }))}>
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
                                                value={shoes.genderCategoryID}
                                                onChange={(e) => setShoes(
                                                    (prevShoes) => ({
                                                        ...prevShoes,
                                                        genderCategoryID: e.target.value,
                                                    }))}>
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
                                        <input type="text" className="form-control" id="brand"
                                               value={shoes.brand}
                                               onChange={(e) => setShoes(
                                                   (prevShoes) => ({
                                                       ...prevShoes,
                                                       brand: e.target.value,
                                                   }))}/>
                                    </div>

                                    <div className="col-md-6">
                                        <label htmlFor="shoeType" className="form-label">Shoe type</label>
                                        <select className="form-select"
                                                aria-label="Default select example"
                                                id="shoeType"
                                                disabled={shoes.genderCategoryID === "errors"}
                                                value={shoes.shoesCategoryID}
                                                onChange={(e) => setShoes(
                                                    (prevShoes) => ({
                                                        ...prevShoes,
                                                        shoesCategoryID: e.target.value,
                                                    }))}>
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
                                        <input type="number" className="form-control" id="price"
                                               value={shoes.price}
                                               onChange={(e) => setShoes(
                                                   (prevShoes) => ({
                                                       ...prevShoes,
                                                       price: e.target.value,
                                                   }))}/>
                                    </div>


                                    <div className="col-12">
                                        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                            <button type="button" className="btn btn-dark"
                                                    disabled={false}
                                                    onClick={handleCreateProduct}>Create
                                            </button>
                                            <button className="btn btn-light border border-dark" type="button">Cancel
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed bg-body" type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#shoeColor" aria-expanded="false"
                                    aria-controls="shoeColor"
                                    disabled={!status.shoes}>
                                <span className="fw-semibold">
                                    <i className={`bi bi-check-circle-fill me-2 fs-4 ${status.color ? "text-success" : ""}`}></i>
                                    Color of Shoes #{shoes?.id}
                                </span>
                            </button>
                        </h2>
                        <div id="shoeColor" className="accordion-collapse collapse">
                            <div className="accordion-body bg-body">
                                <div className="hstack gap-3 w-75 mx-auto">
                                    <input className="form-control me-auto" type="text"
                                           placeholder="Add shoes color here..."
                                           value={color}
                                           onChange={(e) => setColor(e.target.value)}/>
                                    <button type="button" className="btn btn-secondary"
                                            onClick={handleCreateDetail}>Add
                                    </button>
                                    <div className="vr"></div>
                                    <button type="button" className="btn btn-outline-danger">Next</button>
                                </div>
                                <div className="d-flex w-75 mx-auto mt-2">
                                    {
                                        colorList?.map((item) => (
                                            <span className="badge text-bg-dark me-1 fs-6">{item}</span>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed bg-body" type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#shoeImg" aria-expanded="false"
                                    aria-controls="shoeImg"
                                    disabled={!status.color || !status.shoes}>
                                <span className="fw-semibold">
                                    <i className={`bi bi-check-circle-fill me-2 fs-4 ${status.img ? "text-success" : ""}`}></i>
                                    Image
                                </span>
                            </button>
                        </h2>
                        <div id="shoeImg" className="accordion-collapse collapse">
                            <div className="accordion-body bg-body">
                                <div className="w-75 mx-auto">
                                    <div className="hstack gap-3">
                                        <select className="form-select w-auto" aria-label="Default select example"
                                                value={image.productDetailID}
                                                onChange={(e) => setImage(
                                                    (prevState) => ({
                                                        ...prevState,
                                                        productDetailID: e.target.value,
                                                    }))}>
                                            <option value="Notfound">Choose color</option>
                                            {
                                                listDetail?.map((item) => (
                                                    <option value={item.id}>{item?.color}</option>
                                                ))
                                            }
                                        </select>
                                        <input className="form-control" type="file" id="formFile"
                                               onChange={(e) => setPicture(e.target.files[0])}
                                               disabled={!image.productDetailID || image.productDetailID === "Notfound"}/>
                                        <button type="button" className="btn btn-secondary"
                                                disabled={!image.productDetailID || image.productDetailID === "Notfound"}
                                                onClick={handleUpload}>Upload
                                        </button>
                                        <div className="vr"></div>
                                        <button type="button" className="btn btn-outline-danger">Next</button>
                                        <hr/>
                                    </div>
                                    <div className="my-3 row row-cols-5 g-1">
                                        {
                                            galleryList?.length > 0 ? (
                                                galleryList?.map((g) => (
                                                    <div className="col-md-3 col-lg-3 p-1"
                                                         key={g.id}>
                                                        <img src={g.image} className="img-fluid square-img"
                                                             alt="..."/>
                                                    </div>
                                                ))
                                            ) : (
                                                <></>
                                            )
                                        }

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed bg-body" type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#shoeSize" aria-expanded="false"
                                    aria-controls="shoeSize"
                                    disabled={!status.color || !status.shoes}>
                                <span className="fw-semibold">
                                    <i className={`bi bi-check-circle-fill me-2 fs-4 ${status.size ? "text-success" : ""}`}></i>
                                    Size</span>
                            </button>
                        </h2>
                        <div id="shoeSize" className="accordion-collapse collapse">
                            <div className="accordion-body bg-body">
                                <div className="w-75 mx-auto">
                                    <select className="form-select w-auto mb-2" aria-label="Default select example"
                                            value={detailId}
                                            onChange={(e) => setDetailId(e.target.value)}>
                                        <option value="Notfound">Choose color</option>
                                        {
                                            listDetail?.map((item) => (
                                                <option value={item.id}>{item?.color}</option>
                                            ))
                                        }
                                    </select>
                                    <>
                                        {
                                            shoesSize?.map((item) => (
                                                <div className="col-md-3" key={item?.id}>
                                                    <div className="input-group mb-3">
                                                                <span className="input-group-text"
                                                                      ># {item.size}
                                                                </span>
                                                        <input type="number"
                                                               className="form-control"
                                                               aria-describedby="basic-addon1"
                                                               defaultValue={item.stock} readOnly={true}/>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </>
                                    {(detailId && detailId !== "Notfound") &&
                                    shoesSize?.length > 0 ? (
                                        <div className="row row-cols-4 g-2">
                                            {sizeSample?.map((sample) => (
                                                <div className="col-md-3">
                                                    <div className="input-group mb-3">
                                                                <span className="input-group-text"
                                                                      key={sample.id}># {sample.size}
                                                                </span>
                                                        <input type="number"
                                                               className="form-control"
                                                               aria-describedby="basic-addon1"
                                                               value={stockData[sample.id] || 0} // Giá trị riêng cho từng size
                                                               min={0}
                                                               onChange={
                                                                   (e) =>
                                                                       handleChangeStockSample(e, sample.id)
                                                               }/>
                                                    </div>
                                                </div>
                                            ))}

                                            <div className="col-md-3">
                                                <button className="btn btn-dark"
                                                        type="button"
                                                        onClick={handleCreateSize}>Add shoes size
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <></>
                                    )}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductNew;