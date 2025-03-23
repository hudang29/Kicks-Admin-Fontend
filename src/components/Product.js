import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import CategoryAPI from "../api/CategoryAPI";
import {formatCurrency} from "../utils/Format";
import GalleryAPI from "../api/GalleryAPI";

function Product({name, price, page, shoesCategoryID, genderCategoryID, brand, id}) {

    const [shoesCategory, setShoesCategory] = useState(null);
    const [genderCategory, setGenderCategory] = useState(null);
    const [gallery, setGallery] = useState();

    useEffect(() => {
        if (genderCategoryID) {
            CategoryAPI.getGenderCategoryById(genderCategoryID)
                .then((data) => setGenderCategory(data))
                .catch((error) => console.error("Lỗi khi lấy danh mục giới tính:", error));
        }
    }, [genderCategoryID]);

    useEffect(() => {
        if (shoesCategoryID) {
            CategoryAPI.getShoesCategoryById(shoesCategoryID)
                .then((data) => setShoesCategory(data))
                .catch((error) => console.error("Lỗi khi lấy danh mục giày:", error));
        }
    }, [shoesCategoryID]);

    useEffect(() => {
        GalleryAPI.getProductGallery(id)
            .then((data) => setGallery(data))
            .catch((error) => console.error("Lỗi khi lấy ảnh", error));
    }, [id])

    return (
        <div className="card p-3 h-100" key={id}>
            <div className="row g-0">
                <div className="col-md-4">
                    <img
                        src={gallery}
                        className="img-fluid square-img" alt={name}/>
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <div className="hstack">
                            <div>
                                <p>{name}</p>
                            </div>
                            <div className="ms-auto">
                                <Link to={`/product/${id}?page=${page}`}
                                      className="nav-link mb-2 px-1 rounded rounded-1 btnhover-232321 bg-body-secondary">
                                    <i className="bi bi-three-dots"></i>
                                </Link>
                            </div>
                        </div>
                        <div className="hstack">
                            <div>
                                <p><small className="text-body-secondary">{shoesCategory?.name || "erros"}</small></p>
                            </div>
                            <div className="ms-auto">
                                <p><small className="text-body-secondary">{brand}</small></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card-body">
                <h5 className="card-title">{formatCurrency(price)}</h5>
            </div>
            <div className="card">
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">{genderCategory?.name || "errors"}</li>
                </ul>
            </div>
        </div>
    )
        ;
}

export default Product;