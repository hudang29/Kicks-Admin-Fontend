import {Link} from "react-router-dom";
import logo from "../assets/IconKicks.png";
import {useEffect, useState} from "react";
import CategoryAPI from "../api/CategoryAPI";

function CardDetail({id, productId, color, product}) {

    const [shoesCategory, setShoesCategory] = useState(null);

    useEffect(() => {
        if (product) {
            CategoryAPI.getShoesCategoryById(product.genderCategoryID)
                .then((data) => setShoesCategory(data))
                .catch((error) => console.error("Lỗi khi lấy danh mục giày:", error));
        }
    }, [product]);

    return (
        <div className="card card border border-0 mb-3">
            <div className="row g-0">
                <div className="col-md-2">
                    <img src={logo} className="img-fluid rounded-start" alt="..."/>
                </div>
                <div className="col-md-10">
                    <div className="card-body">
                        <div className="hstack">
                            <div>
                                <p>{color}</p>
                            </div>
                            <div className="ms-auto">
                                <Link to={`/product-detail/${id}`}
                                         className="nav-link mb-3 px-1 rounded rounded-1 btnhover-232321 bg-body-secondary">
                                    <i className="bi bi-three-dots"></i>
                                </Link>
                            </div>
                        </div>
                        <div className="hstack">
                            <div>
                                <p>
                                    <small
                                        className="text-body-secondary">{shoesCategory?.name || "errors"}
                                    </small>
                                </p>
                            </div>
                            <div className="ms-auto">
                                <p>
                                    <small className="text-body-secondary">
                                        {product?.brand || "errors"}
                                    </small>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CardDetail;