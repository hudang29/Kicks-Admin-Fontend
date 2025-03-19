import {Link} from "react-router-dom";
import LoginVM from "../viewmodels/LoginVM";
import StaffsVM from "../viewmodels/StaffsVM";

function Menu() {
    const {handleLogout} = LoginVM();
    //const {staff} = StaffsVM();
    return (
        <div className="pe-5 d-flex align-items-center justify-content-end"
             style={{height: "10vh"}}>
            <div className="hstack gap-3 ">
                <div className="border border-dark border-1 rounded">
                    <div className="hstack gap-1">
                        <input className="form-control me-auto" type="text" placeholder="Search"
                               aria-label="Search"/>
                        <button type="button" className="btn"><i className="bi bi-search"></i></button>
                    </div>
                </div>
                <div className="border border-dark border-1 rounded">
                    <input className="form-control me-auto" type="text" readOnly={true}/>
                </div>
                <Link to="/login" onClick={handleLogout} className="btn btn-light nav-link border border-1 border-dark"><i
                    className="bi bi-box-arrow-in-right p-2 fs-4"></i></Link>
            </div>
        </div>
    );
}

export default Menu;