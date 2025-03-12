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
                    <img src={logo} className="img-fluid" style={{height: "100%"}} alt="KICKS"/>
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
                        <span className="me-auto"><i className="bi bi-inboxes"></i> ALL SHOES</span>
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
                    <hr/>
                    <Link to="/profile"
                          className={`btn p-3 hstack ${active === "profile" ? "btn-kicks" : "btnhover-4A69E2"}`}
                          onClick={() => handleClick("profile")}>
                        <span className="me-auto"><i className="bi bi-shop"></i> HOME</span></Link>
                </div>
            </div>
        </>
    );
}

export default Sidebar;