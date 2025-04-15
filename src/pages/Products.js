import Product from "../components/Product";
import {Link} from "react-router-dom";
import ProductsVM from "../viewmodels/ProductsVM";
import {useEffect} from "react";
import LoadingPage from "../components/LoadingPage";

function Products() {
    const {
        loading,
        shoes, page, totalPages, filteredData, setFilteredData,
        handleChangePage, handleFindProduct,
    } = ProductsVM();
    return (
        <>
            <LoadingPage
                props={loading}
            />
            <div className="my-3">
                <p className="fw-semibold fs-2">All Shoes</p>
                <div className="hstack">
                    <div className="">
                        <nav style={{"--bs-breadcrumb-divider": "'>'"}} aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><Link to="#"
                                                                      className="nav-link">Home</Link></li>
                                <li className="breadcrumb-item active" aria-current="page">All Shoes Page
                                    #{page + 1}</li>
                            </ol>
                        </nav>
                    </div>

                    <div className="ms-auto">
                        <Link to="/newproduct"
                              className="nav-link rounded rounded-2 px-5 py-2 btn-kicks-dark">
                            ADD NEW SHOES
                        </Link>
                    </div>
                </div>
            </div>
            <div className="hstack gap-3 mb-3">
                <div className="btn-group">
                    <button type="button" className="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown"
                            aria-expanded="false">
                        Price
                    </button>
                    <ul className="dropdown-menu">
                        <li></li>
                        <li><a className="dropdown-item" href="#">Another action</a></li>
                        <li><a className="dropdown-item" href="#">Something else here</a></li>
                        <li>
                            <hr className="dropdown-divider"/>
                        </li>
                        <li><a className="dropdown-item" href="#">Separated link</a></li>
                    </ul>
                </div>
                <div className="vr"></div>
                <div className="btn-group">
                    <button type="button" className="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown"
                            aria-expanded="false">
                        Sort
                    </button>
                    <ul className="dropdown-menu">
                        <li></li>
                        <li>
                            <button className="dropdown-item"
                                    onClick={() => setFilteredData(prevState => ({
                                        ...prevState,
                                        sortBy: "newest",
                                    }))}>Newest
                            </button>
                        </li>
                        <li>
                            <button className="dropdown-item"
                                    onClick={() => setFilteredData(prevState => ({
                                        ...prevState,
                                        sortBy: "oldest",
                                    }))}
                            >Oldest</button>
                        </li>
                    </ul>
                </div>
                <input className="form-control ms-auto w-25" type="text" placeholder="Search"
                       value={filteredData.name}
                       onChange={(e) => setFilteredData(prevState => ({
                           ...prevState,
                           name: e.target.value,
                       }))}/>

            </div>
            <div className="row row-cols-1 row-cols-md-3 g-3 mb-3">
                {
                    shoes.length > 0 ? (
                        shoes.map((product) => (
                            <div className="col">
                                <Product
                                    name={product.name}
                                    price={product.price}
                                    description={product.description}
                                    shoesCategoryID={product.shoesCategoryID}
                                    genderCategoryID={product.genderCategoryID}
                                    brand={product.brand}
                                    id={product.id}
                                    page={page}
                                />
                            </div>
                        ))
                    ) : (
                        <div className="text-center">
                            <p>Not Available</p>
                        </div>

                    )
                }
            </div>
            {
                totalPages > 0 ? (
                    <nav aria-label="...">
                        <ul className="pagination hstack gap-3">
                            <li className={`page-item ${page === 0 ? "disabled" : ""}`}>
                                <button
                                    className="page-link"
                                    onClick={() => handleChangePage(page - 1)}
                                    disabled={page === 0}
                                >
                                    Previous
                                </button>
                            </li>
                            {[...Array(totalPages)].map((_, index) => (
                                <li key={index} className="page-item">
                                    <button
                                        className={`page-link px-3 ${page === index ? "btn-kicks-dark" : ""}`}
                                        onClick={() => handleChangePage(index)}
                                    >
                                        {index + 1}
                                    </button>
                                </li>
                            ))}

                            <li className={`page-item ${page + 1 >= totalPages ? "disabled" : ""}`}>
                                <button
                                    className="page-link"
                                    onClick={() => handleChangePage(page + 1)}
                                    disabled={page + 1 >= totalPages}
                                >
                                    Next
                                </button>
                            </li>
                        </ul>
                    </nav>
                ) : (
                    <></>
                )
            }
        </>
    );
}

export default Products;