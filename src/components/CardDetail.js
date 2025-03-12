import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import DiscountAPI from "../api/DiscountAPI";
import {formatCurrency} from "../utils/Format";
import GalleryAPI from "../api/GalleryAPI";


function CardDetail({detailId, color, product, productDetail, isDefault}) {

    const [discount, setDiscount] = useState(null);
    const [gallery, setGallery] = useState(null);


    useEffect(() => {
        if (productDetail) {
            DiscountAPI.getDiscount(productDetail.discountId)
                .then((data) => {
                        //console.log(productDetail.discountId);
                        //console.log(data);
                        setDiscount(data)
                    }
                )
                .catch((error) => {
                    console.log("Lỗi khi lấy discount", error)
                });
            GalleryAPI.getProductDetailGallery(productDetail.id)
                .then((data) => setGallery(data))
                .catch((error) => console.error("Lỗi lấy hình detail", error))
        }
    }, [productDetail]);

    return (
        <div className="card card border border-0 mb-3">
            <div className="row g-0">
                <div className="col-md-3">
                    <img src={gallery} className="img-fluid square-img" alt="..."/>
                </div>
                <div className="col-md-9">
                    <div className="card-body">
                        <div className="hstack">
                            <div>
                                <p>{color}</p>
                            </div>
                            <div className="ms-auto">
                                <Link to={`/product-detail/${detailId}`}
                                      className="nav-link mb-3 px-1 rounded rounded-1 btnhover-232321 bg-body-secondary">
                                    <i className="bi bi-three-dots"></i>
                                </Link>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="flexRadioDefault"
                                           id={detailId}
                                           //value={isDefault}
                                           checked={isDefault}/>
                                </div>
                            </div>
                        </div>
                        {
                            discount?.discountRate > 0 ? (
                                <div className="hstack">
                                    <p>

                                        <small>
                                            <del>{formatCurrency(product?.price)}</del>
                                        </small>

                                    </p>
                                    <div className="ms-auto">
                                        <small>
                                            {formatCurrency(
                                                product?.price - (product?.price * discount?.discountRate / 100)
                                            )}
                                        </small>
                                    </div>
                                </div>
                            ) : (
                                <div className="hstack">
                                    <p>
                                        <small>
                                            {formatCurrency(product?.price) || NaN}
                                        </small>
                                    </p>
                                </div>
                            )
                        }

                    </div>
                </div>
            </div>
        </div>
    );
}

export default CardDetail;