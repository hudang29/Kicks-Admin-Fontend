import CardDetail from "../components/CardDetail";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import ProductDetailAPI from "../api/ProductDetailAPI";
import ProductAPI from "../api/ProductAPI";
import logo from "../assets/IconK.png";
import SizeAPI from "../api/SizeAPI";

function ProductDetail() {
    const {id} = useParams();

    const [productDetail, setProductDetail,] = useState([]); // State lưu danh sách
    const [product, setProduct] = useState(null); // State lưu danh sách

    useEffect(() => {
        ProductDetailAPI.getAll(id)
            .then((data) => {
                //console.log(data);
                setProductDetail(data); // Lưu danh sách vào state
            })
            .catch((error) => console.error("Lỗi khi lấy danh sách người dùng:", error));
    }, []);

    useEffect(() => {
        ProductAPI.getProductById(id)
            .then((data) => {
                //console.log(data);
                setProduct(data); // Lưu danh sách vào state
            })
            .catch((error) => console.error("Lỗi khi lấy danh sách người dùng:", error));
    }, []);

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

            <div className="row mb-3" >
                <div className="col-md-8">
                    {
                        productDetail.length > 0 ?
                            (productDetail.map((item) =>
                                    <CardDetail
                                        id={item.id}
                                        name={item.name}
                                        color={item.color}
                                        product={product}
                                        productId={id}
                                        //size={size}
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