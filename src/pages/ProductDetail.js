import ProductDetailVM from "../viewmodels/ProductDetailVM";
import {Link, useSearchParams} from "react-router-dom";
import LoadingPage from "../components/LoadingPage";
import AccordionItem from "../components/AccordionItem";
import {formatCurrency} from "../utils/Format";

function ProductDetail() {
    const [searchParams] = useSearchParams();
    const page = searchParams.get("page") || 0;

    const {
        loading, picture, size, discount,
        productDetail, shoesColor, product, setProduct,
        newColor, setNewColor, gender, type,
        handleAddColor, handleColorChange, handleDiscountChange, handleStockChange,
    } = ProductDetailVM();

    console.log(size);
    console.log(picture);
    return (
        <>
            <LoadingPage
                props={loading}/>
            <div className="my-3">
                <p className="fw-semibold fs-2">Shoes Detail</p>
                <div className="hstack">
                    <div className="p-1">
                        <nav style={{"--bs-breadcrumb-divider": "'>'"}} aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><Link to="#" className="nav-link">Home</Link></li>
                                <li className="breadcrumb-item">
                                    <Link to={`/allproducts`} className="nav-link d-inline-block">
                                        >All Shoes {page}</Link>
                                </li>
                                <li className="breadcrumb-item active" aria-current="page">Shoes Detail</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>

            <div className="card mb-3">
                <div className="card-body text-center">
                    <h5>#{product?.id || "###"}</h5>
                </div>
            </div>

            <div className="row mb-3">
                <div className="col-md-6">
                    <div className="card mb-3 h-100 rounded rounded-0">
                        <div className="card-body">
                            <form className="row g-3">
                                <div className="col-12">
                                    <label htmlFor="name" className="form-label">Product Name</label>
                                    <input type="text" className="form-control" id="name"
                                           value={product?.name}
                                           onChange={(e) => setProduct(
                                               (prevShoes) => ({
                                                   ...prevShoes,
                                                   name: e.target.value,
                                               }))}/>
                                </div>

                                <div className="col-12">
                                    <label htmlFor="exampleFormControlTextarea1" className="form-label">
                                        Description
                                    </label>
                                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="7"
                                              value={product?.description}
                                              onChange={(e) => setProduct(
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
                                            value={product?.supplierID}
                                            onChange={(e) => setProduct(
                                                (prevShoes) => ({
                                                    ...prevShoes,
                                                    supplierID: e.target.value
                                                }))}>
                                        <option>Choose Supplier</option>
                                        {/*{*/}
                                        {/*    supplier?.length > 0 ? (*/}
                                        {/*        supplier?.map((item) => (*/}
                                        {/*            <option key={item.id} value={item.id}>{item.name}</option>*/}
                                        {/*        ))*/}
                                        {/*    ) : (*/}
                                        {/*        <option>Errors</option>*/}
                                        {/*    )*/}
                                        {/*}*/}
                                    </select>
                                </div>

                                <div className="col-md-6">
                                    <label htmlFor="gender" className="form-label">Gender</label>
                                    <select className="form-select"
                                            aria-label="Default select example"
                                            id="gender"
                                            value={product?.genderCategoryID}
                                            onChange={(e) => setProduct(
                                                (prevShoes) => ({
                                                    ...prevShoes,
                                                    genderCategoryID: e.target.value,
                                                }))}>
                                        <option value="errors">Choose Gender</option>
                                        {/*{*/}
                                        {/*    genderCategory.length > 0 ? (*/}
                                        {/*        genderCategory.map((gender) => (*/}
                                        {/*            <option key={gender.id} value={gender.id}>{gender.name}</option>*/}
                                        {/*        ))*/}
                                        {/*    ) : (*/}
                                        {/*        <option>Errors</option>*/}
                                        {/*    )*/}
                                        {/*}*/}
                                    </select>
                                </div>

                                <div className="col-md-6">
                                    <label htmlFor="brand" className="form-label">Brand</label>
                                    <input type="text" className="form-control" id="brand"
                                           value={product?.brand}
                                           onChange={(e) => setProduct(
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
                                        // disabled={shoes.genderCategoryID === "errors"}
                                            value={product?.shoesCategoryID}
                                            onChange={(e) => setProduct(
                                                (prevShoes) => ({
                                                    ...prevShoes,
                                                    shoesCategoryID: e.target.value
                                                }))}>
                                        <option>Choose Type</option>
                                        {/*{*/}
                                        {/*    shoesCategory.length > 0 ? (*/}
                                        {/*        shoesCategory.map((shoe) => (*/}
                                        {/*            <option key={shoe.id} value={shoe.id}>{shoe.name}</option>*/}
                                        {/*        ))*/}
                                        {/*    ) : (*/}
                                        {/*        <option>Errors</option>*/}
                                        {/*    )*/}
                                        {/*}*/}
                                    </select>
                                </div>

                                <div className="col-md-12">
                                    <label htmlFor="price" className="form-label">Regular Price</label>
                                    <input type="number" className="form-control" id="price"
                                           value={product.price}
                                           onChange={(e) => setProduct(
                                               (prevShoes) => ({
                                                   ...prevShoes,
                                                   price: e.target.value
                                               }))}/>
                                </div>

                                {/*<div className="col-12">*/}
                                {/*    <label htmlFor="price" className="form-label">Sale Price</label>*/}
                                {/*    <input type="text" className="form-control" id="price" readOnly*/}
                                {/*           value={formatCurrency(salePrice)}*/}
                                {/*        // value={salePrice}*/}
                                {/*    />*/}
                                {/*</div>*/}

                                <div className="col-12">
                                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                        <button className="btn btn-dark"
                                                type="button">Update
                                        </button>
                                        <button className="btn btn-danger" type="button">Delete</button>
                                        <button className="btn btn-light border border-dark"
                                                type="button">Reset
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="accordion accordion-flush mb-3" id="accordionFlushExample">
                        {productDetail ? (
                            productDetail?.map((item) =>
                                <AccordionItem
                                    key={item.id}
                                    header={
                                        <>
                                            <img src={picture?.find(
                                                p => p?.detail === item.id)?.pictureUrl || ""}
                                                 className="img-table" alt={`...`}/>
                                            <p className="ms-2">#{item.id}</p>
                                            <p className="ms-3">
                                                {
                                                    shoesColor?.map((c) =>
                                                        c.id === item.id ? c?.color : "")
                                                }
                                            </p>

                                        </>
                                    }
                                    body={
                                        <>
                                            <div className="row row-cols-2 row-cols-lg-5 g-2 g-lg-3 mb-4">
                                                {
                                                    picture?.find(
                                                        p => p?.detail === item.id)
                                                        ?.listImg?.map(
                                                        image =>
                                                            <div className="col">
                                                                <img className="img-table" src={image?.image}
                                                                     alt={`...`}/>
                                                            </div>
                                                    )
                                                }
                                            </div>
                                            <form className="row mb-4">
                                                <div className="col-md-6">
                                                    <label htmlFor="color" className="form-label">Color</label>
                                                    <input type="text" className="form-control" id="color"
                                                           value={item.color || ""}
                                                           onChange={(e) => handleColorChange(
                                                               item.id, e.target.value)}/>
                                                </div>
                                                <div className="col-6">
                                                    <label htmlFor="discount"
                                                           className="form-label">Discount</label>
                                                    <select className="form-select"
                                                            aria-label="Default select example"
                                                            id="discount"
                                                            value={item.discountId}
                                                            onChange={(e) => handleDiscountChange(
                                                                item.id, e.target.value
                                                            )}>
                                                        {
                                                            discount?.length > 0 ? (
                                                                discount?.map((discount) => (
                                                                    <option key={discount.id}
                                                                            value={discount.id}>{discount.discountRate} %</option>
                                                                ))
                                                            ) : (
                                                                <option>Errors</option>
                                                            )
                                                        }
                                                    </select>
                                                </div>
                                            </form>
                                            <div className="row row-cols-2 row-cols-lg-4 g-2 g-lg-3">
                                                {
                                                    size?.map(s => (
                                                        s?.detail === item.id ? (
                                                            s?.sizeDetail?.map((size) => (
                                                                <div className="col">
                                                                    <div className="input-group mb-3 w-auto"
                                                                         key={size.id}>
                                                                <span className="input-group-text"
                                                                ># {size.size}
                                                                </span>
                                                                        <input type="number"
                                                                               className="form-control"
                                                                               aria-describedby="basic-addon1"
                                                                               value={size.stock || 0} // Giá trị riêng cho từng size
                                                                               min={0}
                                                                               onChange={
                                                                                   (e) => (
                                                                                       handleStockChange(size.id, item.id, e.target.value)
                                                                                   )
                                                                               }
                                                                        />
                                                                    </div>
                                                                </div>
                                                            ))
                                                        ) : (
                                                            <></>
                                                        )
                                                    ))
                                                }
                                            </div>

                                            <div className="col-auto">
                                                <button type="submit"
                                                        className="btn btn-primary">Submit
                                                </button>
                                            </div>
                                        </>
                                    }
                                    unique={`detail-${item.id}`}
                                />
                            )
                        ) : (
                            <></>
                        )
                        }

                    </div>
                    {/*{*/}
                    {/*    productDetail.length > 0 ?*/}
                    {/*        (productDetail.map((item) =>*/}
                    {/*                <CardDetail*/}
                    {/*                    detailId={item.id}*/}
                    {/*                    color={item.color}*/}
                    {/*                    isDefault={item.isDefault}*/}
                    {/*                    productDetail={item}*/}
                    {/*                    product={product}*/}
                    {/*                />*/}
                    {/*            )*/}
                    {/*        ) : (*/}
                    {/*            <div className="text-center">*/}
                    {/*                <p>No Available</p>*/}
                    {/*            </div>*/}
                    {/*        )*/}
                    {/*}*/}
                    <div className="hstack">
                        <div className="ms-auto w-auto">
                            <button type="button" className="btn-kicks btn" data-bs-toggle="modal"
                                    data-bs-target="#staticBackdrop">
                                <span className="d-inline-block">Add new color</span>
                            </button>

                            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static"
                                 data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel"
                                 aria-hidden="true">
                                <div className="modal-dialog modal-dialog-centered">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h1 className="modal-title fs-5" id="staticBackdropLabel">New Color</h1>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal"
                                                    aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <div className="input-group flex-nowrap">
                                                <span className="input-group-text">Color</span>
                                                <input type="text" className="form-control"
                                                       id="newColor"
                                                       value={newColor}
                                                       onChange={
                                                           (e) => setNewColor(e.target.value)
                                                       }/>
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary"
                                                    data-bs-dismiss="modal">Close
                                            </button>
                                            <button type="button" className="btn btn-primary"
                                                    onClick={handleAddColor}
                                                    data-bs-dismiss="modal">Create
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductDetail;