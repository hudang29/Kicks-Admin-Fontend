import CardDetail from "../components/CardDetail";
import logo from "../assets/IconK.png";
import ProductDetailVM from "../viewmodels/ProductDetailVM";

function ProductDetail() {
    const {productDetail, product} = ProductDetailVM();

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
                    <h5>{productDetail.length > 0 ? (productDetail.at(0).name) : "errors"}</h5>
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
                                        product={product}
                                    />
                                )
                            ) : (
                                <p> 404 </p>
                            )
                    }
                </div>
                <div className="col-md-4 border border-1" style={{height: "fit-content"}}>
                    <img src={logo} className="img-fluid rounded-start" alt="..."/>
                </div>
            </div>
        </>
    );
}

export default ProductDetail;