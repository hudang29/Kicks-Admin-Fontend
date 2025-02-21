import CardDetail from "../components/CardDetail";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import ProductDetailAPI from "../api/ProductDetailAPI";
import SizeAPI from "../api/SizeAPI";

function ProductDetail() {
    const {id} = useParams();

    const [productDetail, setProductDetail, ] = useState([]); // State lưu danh sách
    // const [size, setSize] = useState([]); // State lưu danh sách

    useEffect(() => {
        ProductDetailAPI.getAll(id)
            .then((data) => {
                //console.log(data);
                setProductDetail(data); // Lưu danh sách vào state
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
            {
                productDetail.length > 0 ?
                    (productDetail.map((item) =>
                            <CardDetail
                                id={item.id}
                                name={item.name}
                                color={item.color}
                                //discount={item.discount}
                                //size={size}
                            />
                        )
                    ) : (
                        <p> 404 </p>
                    )
            }
        </>
    );
}

export default ProductDetail;