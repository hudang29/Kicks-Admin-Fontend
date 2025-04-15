import {Link} from "react-router-dom";
import ProductFormVM from "../viewmodels/ProductFormVM";
import {formatCurrency} from "../utils/Format";
import LoadingPage from "../components/LoadingPage";

function ProductForm() {

    const {
        loading,
        detailId, shoes, setShoes, shoesDetail, setShoesDetail,
        supplier, genderCategory, shoesCategory, discount,
        size,
        salePrice,
        sizeSample, stockData,
        galleryList, gallery,
        handleChangeStock, handleChangeStockSample, handleCreateSize,
        handleCancel, handleUpdate,
        handleFileChange, handleUpload, handleImgChange,
    } = ProductFormVM();


    return (
        <>
            <LoadingPage
                props={loading}/>
            <div className="my-2">
                <p className="fw-semibold fs-2 mb-1">Shoes Form</p>
                <div className="d-flex align-items-center mt-0">
                    <div className="">
                        <nav style={{"--bs-breadcrumb-divider": "'>'"}} aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><Link to="#" className="nav-link">Home</Link></li>
                                <li className="breadcrumb-item">
                                    <Link to="#" className="nav-link d-inline-block">All Shoes</Link>
                                </li>
                                <li className="breadcrumb-item">
                                    <Link to={`/product/${shoes?.id}`}
                                          className="nav-link d-inline-block">
                                        Shoes Detail
                                    </Link>
                                </li>
                                <li className="breadcrumb-item active" aria-current="page">Shoes Form</li>
                            </ol>
                        </nav>
                    </div>
                </div>
                <hr/>
            </div>

            <div>
                <div className="card mb-3 p-3 rounded rounded-0 w-75 mx-auto">
                    <div className="card mb-3">
                        <div className="card-body text-center">
                            <h5># {detailId}</h5>
                        </div>
                    </div>
                    <div className="row g-3">
                        <div className="col-md-8">
                            <form className="row g-3">

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
                                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="4"
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
                                                    supplierID: e.target.value
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
                                                   brand: e.target.value
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
                                                    shoesCategoryID: e.target.value
                                                }))}>
                                        <option>Choose Type</option>
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
                                           value={shoesDetail.color}
                                           onChange={(e) => setShoesDetail(
                                               (prevShoes) => ({
                                                   ...prevShoes,
                                                   color: e.target.value
                                               }))}/>
                                </div>

                                <div className="col-md-6">
                                    <label htmlFor="price" className="form-label">Regular Price</label>
                                    <input type="number" className="form-control" id="price"
                                           value={shoes.price}
                                           onChange={(e) => setShoes(
                                               (prevShoes) => ({
                                                   ...prevShoes,
                                                   price: e.target.value
                                               }))}/>
                                </div>

                                <div className="col-12">
                                    <label htmlFor="discount" className="form-label">Discount</label>
                                    <select className="form-select"
                                            aria-label="Default select example"
                                            id="discount"
                                            value={shoesDetail.discountId}
                                            onChange={(e) => setShoesDetail(
                                                (prevShoes) => ({
                                                    ...prevShoes,
                                                    discountId: e.target.value
                                                }))}>
                                        <option value="errors">Choose Discount</option>
                                        {
                                            discount.length > 0 ? (
                                                discount.map((discount) => (
                                                    <option key={discount.id}
                                                            value={discount.id}>{discount.discountRate} %</option>
                                                ))
                                            ) : (
                                                <option>Errors</option>
                                            )
                                        }
                                    </select>
                                </div>

                                <div className="col-12">
                                    <label htmlFor="price" className="form-label">Sale Price</label>
                                    <input type="text" className="form-control" id="price" readOnly
                                           value={formatCurrency(salePrice)}
                                        // value={salePrice}
                                    />
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
                                                                   id={size.id}
                                                                   value={size.stock} // Giá trị riêng cho từng size
                                                                   min={0}
                                                                   onChange={
                                                                       (e) => handleChangeStock(e, size.id)
                                                                   }/>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                sizeSample.length > 0 ? (
                                                    <>
                                                        {sizeSample.map((sample) => (
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
                                                    </>
                                                ) : (
                                                    <div className="">
                                                        <span>Errors</span>
                                                    </div>
                                                )
                                            )
                                        }
                                    </div>
                                </div>

                                <div className="col-12">
                                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                        <button className="btn btn-dark"
                                                type="button"
                                                onClick={handleUpdate}
                                                disabled={size.length === 0}
                                                hidden={size.length === 0}>Update
                                        </button>
                                        <button className="btn btn-danger" type="button">Delete</button>
                                        <button className="btn btn-light border border-dark"
                                                type="button"
                                                onClick={handleCancel}>Reset
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div className="col-md-4">
                            <img src={gallery} className="img-fluid square-img border border-1 border-dark" alt="..."/>
                            <div className="my-3 row row-cols-4 g-1">
                                {
                                    galleryList.length > 0 ? (
                                        galleryList.map((g) => (
                                            <div className="col-md-3 col-lg-3 col-6 kicks-img p-1" key={g.id}>
                                                <img src={g.image} className="img-fluid square-img"
                                                     alt="..."
                                                     onClick={() => handleImgChange(g.image)}/>
                                            </div>
                                        ))
                                    ) : (
                                        <></>
                                    )
                                }

                            </div>
                            <div className="my-3">
                                <input type="file" onChange={handleFileChange}/>
                                <button className="btn btn-kicks" onClick={handleUpload}>Upload</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductForm;