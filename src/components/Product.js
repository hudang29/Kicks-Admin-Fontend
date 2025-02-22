import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import CategoryAPI from "../api/CategoryAPI";

function Product({name, price, description, shoesCategoryID, genderCategoryID, brand, id}) {

    const [shoesCategory, setShoesCategory] = useState(null);
    const [genderCategory, setGenderCategory] = useState(null);

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

    return (
        <div className="card p-3" key={id}>
            <div className="row g-0">
                <div className="col-md-4 border border-1">
                    <img src={""} className="img-fluid rounded-start" alt={"..."}/>
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <div className="hstack">
                            <div>
                                <p>{name}</p>
                            </div>
                            <div className="ms-auto">
                                <Link to={`/product/${id}`}
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
                        <div>
                            <p>{price}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card-body">
                <h5 className="card-title">Description</h5>
                <p className="card-text">{description}</p>
            </div>
            <div className="card">
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">{genderCategory?.name || "erros"}</li>
                </ul>
            </div>
        </div>
    )
        ;
}

export default Product;