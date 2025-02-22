import Product from "../components/Product";
import Pagination from "../components/Pagination";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import ProductAPI from "../api/ProductAPI";

function Products() {

    const [products, setProducts] = useState([]); // State lưu danh sách người dùng

    // Cập nhật document.title
    useEffect(() => {
        document.title = "Products";
    }, []);

    useEffect(() => {
        ProductAPI.getAll()
            .then((data) => {
                //console.log(data);
                setProducts(data); // Lưu danh sách vào state
            })
            .catch((error) => console.error("Lỗi khi lấy danh sách người dùng:", error));
    }, []);

    return (
        <>
            <div className="mb-3">
                <h3>All Products</h3>
                <div className="hstack">
                    <div className="">
                        <nav style={{"--bs-breadcrumb-divider": "'>'"}} aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><a href="#" className="nav-link">Home</a></li>
                                <li className="breadcrumb-item active" aria-current="page">All Products</li>
                            </ol>
                        </nav>
                    </div>

                    <div className="ms-auto">
                        <Link to="/newproduct" className="nav-link rounded rounded-2 px-5 py-2"
                              style={{backgroundColor: "#232321", color: "#FAFAFA"}}>
                            ADD NEW PRODUCT
                        </Link>
                    </div>
                </div>
            </div>
            <div className="row row-cols-1 row-cols-md-3 g-3 mb-3">
                {
                    products.length > 0 ? (
                        products.map((product) => (
                            <div className="col">
                                <Product
                                    name={product.name}
                                    price={product.price}
                                    description={product.description}
                                    shoesCategoryID={product.shoesCategoryID}
                                    genderCategoryID={product.genderCategoryID}
                                    brand={product.brand}
                                    id={product.id}
                                />
                            </div>
                        ))
                    ) : (
                        <p>404</p>
                    )
                }
            </div>

            <Pagination/>
        </>
    );
}

export default Products;