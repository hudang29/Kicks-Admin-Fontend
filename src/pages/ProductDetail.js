import CardDetail from "../components/CardDetail";
import logo from "../assets/IconK.png";
import ProductDetailVM from "../viewmodels/ProductDetailVM";

function ProductDetail() {
    const {
        productDetail, product,
        newColor, setNewColor,
        handleAddColor,
    } = ProductDetailVM();

    return (
        <>
            <div className="mb-3">
                <h3>Product Detail</h3>
                <div className="hstack">
                    <div className="p-1">
                        <nav style={{"--bs-breadcrumb-divider": "'>'"}} aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><a href="#" className="nav-link">Home</a></li>
                                <li className="breadcrumb-item">
                                    <a href="#" className="nav-link d-inline-block">All Products</a>
                                </li>
                                <li className="breadcrumb-item active" aria-current="page">Product Detail</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>

            <div className="card mb-3">
                <div className="card-body text-center">
                    <h5>{product?.name || "###"}</h5>
                </div>
            </div>

            <div className="row mb-3">
                <div className="col-md-8">
                    {
                        productDetail.length > 0 ?
                            (productDetail.map((item) =>
                                    <CardDetail
                                        id={item.id}
                                        name={item.name}
                                        color={item.color}
                                        productDetail={item}
                                        product={product}
                                    />
                                )
                            ) : (
                                <p> 404 </p>
                            )
                    }
                    <div className="hstack">
                        <div className="ms-auto w-25">
                            <button type="button" className="btn-kicks btn w-100" data-bs-toggle="modal"
                                    data-bs-target="#staticBackdrop">
                                Add new color
                            </button>

                            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static"
                                 data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel"
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
                <div className="col-md-4 border border-1" style={{height: "fit-content"}}>
                    <img src={logo} className="img-fluid rounded-start" alt="..."/>
                </div>
            </div>
        </>
    );
}

export default ProductDetail;