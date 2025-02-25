import {Link} from "react-router-dom";
import logo from "../assets/KICKS.png";
import {useState} from "react";

function Sidebar() {
    const [active, setActive] = useState(""); // Lưu trang đang chọn

    const handleClick = (page) => {
        setActive(page);
    };
    return (
        <>
            <div className="position-sticky position-sticky top-0 h-100" style={{minWidth: "20vw", height: "80vh"}}>

                <div className="bg-kicks d-flex justify-content-center" style={{height: "10vh"}}>
                    <img src={logo} className="object-fit-cover" style={{height: "100%"}}/>
                </div>

                <div className="vstack gap-2 mx-auto mb-3 p-2">
                    <Link to="/dashboard"
                          className={`btn p-3 hstack ${active === "dashboard" ? "btn-kicks" : "btnhover-4A69E2"}`}
                          onClick={() => handleClick("dashboard")}>
                        <span className="me-auto"><i className="bi bi-clipboard-data"></i> DASHBOARD</span>
                    </Link>
                    <Link to="/allproducts"
                          className={`btn p-3 hstack ${active === "products" ? "btn-kicks" : "btnhover-4A69E2"}`}
                          onClick={() => handleClick("products")}>
                        <span className="me-auto"><i className="bi bi-inboxes"></i> ALL PRODUCTS</span>
                    </Link>
                    <Link to="/staffs"
                          className={`btn p-3 hstack ${active === "staffs" ? "btn-kicks" : "btnhover-4A69E2"}`}
                          onClick={() => handleClick("staffs")}>
                        <span className="me-auto"><i className="bi bi-pc-display-horizontal"></i> STAFFS</span>
                    </Link>
                    <Link to="/orderlist"
                          className={`btn p-3 hstack ${active === "orders" ? "btn-kicks" : "btnhover-4A69E2"}`}
                          onClick={() => handleClick("orders")}>
                        <span className="me-auto">
                            <i className="bi bi-file-earmark-bar-graph-fill"></i> ORDER LIST</span>
                    </Link>
                    <Link to="/other"
                          className={`btn p-3 hstack ${active === "categories" ? "btn-kicks" : "btnhover-4A69E2"}`}
                          onClick={() => handleClick("categories")}>
                        <span className="me-auto"><i className="bi bi-boxes"></i> OTHER</span></Link>
                </div>

                {/*<div className="accordion accordion-flush" id="accordionFlushExample">*/}
                {/*    <div className="accordion-item">*/}
                {/*        <h2 className="accordion-header">*/}
                {/*            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"*/}
                {/*                    data-bs-target="#flush-collapseOne" aria-expanded="false"*/}
                {/*                    aria-controls="flush-collapseOne">*/}
                {/*                <h5 className="fw-bold">Categories</h5>*/}
                {/*            </button>*/}
                {/*        </h2>*/}
                {/*        <div id="flush-collapseOne" className="accordion-collapse collapse"*/}
                {/*             data-bs-parent="#accordionFlushExample">*/}
                {/*            <div className="accordion-body">*/}
                {/*                <div className="hstack gap-3">*/}
                {/*                    <div className="p-2">First item</div>*/}
                {/*                    <div className="p-2 ms-auto">*/}
                {/*                        <input type="checkbox" className="btn-check" id="btn-check1" checked*/}
                {/*                               autoComplete="off"/>*/}
                {/*                        <label className="btn btn-outline-primary" htmlFor="btn-check1">1</label><br/>*/}
                {/*                    </div>*/}
                {/*                </div>*/}
                {/*                <div className="hstack gap-3">*/}
                {/*                    <div className="p-2">First item</div>*/}
                {/*                    <div className="p-2 ms-auto">*/}
                {/*                        <input type="checkbox" className="btn-check" id="btn-check2" checked*/}
                {/*                               autoComplete="off"/>*/}
                {/*                        <label className="btn btn-outline-primary" htmlFor="btn-check2">2</label><br/>*/}
                {/*                    </div>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
        </>
    );
}

export default Sidebar;