import CardDetail from "../components/CardDetail";
import ProductDetailVM from "../viewmodels/ProductDetailVM";
import {Link, useSearchParams} from "react-router-dom";
import LoadingPage from "../components/LoadingPage";

function ProductDetail() {
    const [searchParams] = useSearchParams();
    const page = searchParams.get("page") || 0;

    const {
        loading,
        productDetail, product,
        newColor, setNewColor, gender, type,
        handleAddColor,
    } = ProductDetailVM();

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
                                    <Link to={`/allproducts?page=${page}`} className="nav-link d-inline-block">
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
                    <h5>{product?.brand || "###"}</h5>
                </div>
            </div>

            <div className="row mb-3">
                <div className="col-md-7">
                    {
                        productDetail.length > 0 ?
                            (productDetail.map((item) =>
                                    <CardDetail
                                        detailId={item.id}
                                        color={item.color}
                                        isDefault={item.isDefault}
                                        productDetail={item}
                                        product={product}
                                    />
                                )
                            ) : (
                                <div className="text-center">
                                    <p>No Available</p>
                                </div>
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
                <div className="col-md-5 border border-1">
                    <div className="card mb-3 h-100">
                        <div className="card-body">
                            <h5>{product?.name || "###"}</h5>
                            <p className="text-body-secondary">{gender?.name || "###"}</p>
                            <p className="text-body-secondary">{type?.name || "###"}</p>
                            <p className="fs-5 my-5">{product?.description || "###"}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductDetail;