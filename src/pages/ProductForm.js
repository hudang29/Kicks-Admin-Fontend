import {Link, useParams} from "react-router-dom";
import logo from "../assets/IconKicks.png";
import {useEffect, useState} from "react";
import ProductDetailAPI from "../api/ProductDetailAPI";
import ProductAPI from "../api/ProductAPI";
import CategoryAPI from "../api/CategoryAPI";
import SizeAPI from "../api/SizeAPI";

function ProductForm() {
    const {id} = useParams();

    const [productDetail, setProductDetail,] = useState(null);
    const [product, setProduct] = useState(null);
    const [genderCategory, setGenderCategory] = useState([]);
    const [selectedGender, setSelectedGender] = useState(null);
    const [shoesCategory, setShoesCategory] = useState([]);
    const [selectedShoes, setSelectedShoes] = useState(null);
    const [size, setSize] = useState([]);

    useEffect(() => {
        ProductDetailAPI.getDetailByID(id)
            .then((data) => {
                //console.log(data);
                setProductDetail(data); // Lưu danh sách vào state
            })
            .catch((error) => console.error("Lỗi khi lấy danh sách người dùng:", error));
    }, [id]);

    useEffect(() => {
        if (productDetail) { // Chỉ gọi API nếu productDetail đã có dữ liệu
            ProductAPI.getProductById(productDetail.productId)
                .then((data) => {
                    //console.log(data);
                    setProduct(data); // Cập nhật sản phẩm
                })
                .catch((error) => console.error("Lỗi khi lấy sản phẩm:", error));
        }
    }, [productDetail]);

    useEffect(() => {
        CategoryAPI.getAllGenderCategory()
            .then((data) => {
                //console.log(data);
                setGenderCategory(data); // Lưu danh sách vào state
            })
            .catch((error) => console.error("Lỗi khi lấy danh sách người dùng:", error));
    }, [id]);

    // Lấy danh sách shoe type khi selectedGender thay đổi
    useEffect(() => {
        if (selectedGender) {
            CategoryAPI.getAllCategoryShoesByGenderId(selectedGender)
                .then((data) => setShoesCategory(data))
                .catch((error) => console.error("Lỗi khi lấy danh mục giày:", error));
        }
    }, [selectedGender]);

    useEffect(() => {
        if (product && product.genderCategoryID) {
            setSelectedGender(product.genderCategoryID); // Gán ID từ product khi mở form
        }
    }, [product]);

    useEffect(() => {
        if (product && product.shoesCategoryID) {
            setSelectedShoes(product.shoesCategoryID); // Gán ID từ product khi mở form
        }
    }, [product]);

    useEffect(() => {
        SizeAPI.getAll(id)
            .then((data) => {
                //console.log(data);
                setSize(data); // Lưu danh sách vào state
            })
            .catch((error) => console.error("Lỗi khi lấy danh sách người dùng:", error));
    }, [id]);

    return (
        <>
            <div className="mb-3">
                <h3>Product Form</h3>
                <div className="hstack">
                    <div className="p-1">
                        <nav style={{"--bs-breadcrumb-divider": "'>'"}} aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><a href="#" className="nav-link">Home</a></li>
                                <li className="breadcrumb-item">
                                    <a href="#" className="nav-link d-inline-block">All Products</a>
                                </li>
                                <li className="breadcrumb-item">
                                    <Link to={`/product/${product?.id}`}
                                          className="nav-link d-inline-block">
                                        Products Detail
                                    </Link>
                                </li>
                                <li className="breadcrumb-item active" aria-current="page">Product Form</li>
                            </ol>
                        </nav>
                    </div>

                    <div className="ms-auto">select date</div>
                </div>
            </div>

            <div className="card mb-3">
                <div className="card-body text-center">
                    <h5># {id}</h5>
                </div>
            </div>

            <div className="card mb-3 p-3">
                <div className="row g-3">
                    <div className="col-md-8">
                        <form className="row g-3">
                            <div className="col-12">
                                <label htmlFor="name" className="form-label">Product Name</label>
                                <input type="text" className="form-control" id="name"
                                       value={product?.name || ''}/>
                            </div>
                            <div className="col-12">
                                <label htmlFor="exampleFormControlTextarea1" className="form-label">
                                    Description
                                </label>
                                <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"
                                          value={product?.description || ''}/>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="supplier" className="form-label">Supplier</label>
                                <select className="form-select" aria-label="Default select example" id="supplier">
                                    <option selected>Open this select menu</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </select>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="gender" className="form-label">Gender</label>
                                <select className="form-select"
                                        aria-label="Default select example"
                                        id="gender"
                                        value={selectedGender}
                                        onChange={(e) => setSelectedGender(e.target.value)}>
                                    <option selected value="errors">Choose Gender</option>
                                    {
                                        genderCategory.length > 0 ? (
                                            genderCategory.map((gender) => (
                                                <option key={gender.id} value={gender.id}>{gender.name}</option>
                                            ))
                                        ) : (
                                            <option>Errors</option>
                                        )
                                    }
                                </select>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="brand" className="form-label">Brand</label>
                                <input type="text" className="form-control" id="brand" value={product?.brand || ''}/>
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="shoeType" className="form-label">Shoe type</label>
                                <select className="form-select"
                                        aria-label="Default select example"
                                        id="shoeType"
                                        disabled={selectedGender === "errors"}
                                        value={selectedShoes}
                                        onChange={(e) => setSelectedShoes(e.target.value)}>
                                    <option selected>Open this select menu</option>
                                    {
                                        shoesCategory.length > 0 ? (
                                            shoesCategory.map((shoe) => (
                                                <option key={shoe.id} value={shoe.id}>{shoe.name}</option>
                                            ))
                                        ) : (
                                            <option>Errors</option>
                                        )
                                    }
                                </select>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="color" className="form-label">Color</label>
                                <input type="text" className="form-control" id="color"
                                       value={productDetail?.color || ''}/>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="price" className="form-label">Price</label>
                                <input type="text" className="form-control" id="price" value={product?.price || ''}/>
                            </div>
                            <div className="col-12">
                                <label htmlFor="size" className="form-label">Size</label>
                                <div className="row row-cols-auto" id="size">
                                    {
                                        size.length > 0 ? (
                                            size.map((size) => (
                                                <div className="col-md-3">
                                                    <div className="input-group mb-3">
                                                        <span className="input-group-text"
                                                              key={size.id}># {size.size}</span>
                                                        <input type="number" className="form-control"
                                                               aria-describedby="basic-addon1"
                                                               value={size?.stock || 0}/>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <>
                                            </>
                                        )
                                    }
                                </div>
                            </div>

                            <div className="col-12">
                            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                    <button className="btn btn-dark" type="button">Update</button>
                                    <button className="btn btn-danger" type="button">Delete</button>
                                    <button className="btn btn-light border border-dark" type="button">Cancel</button>
                                </div>
                            </div>
                        </form>
                    </div>

                    <div className="col-md-4">
                        <img src={logo} className="img-fluid rounded border border-1 border-dark" alt="..."/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductForm;