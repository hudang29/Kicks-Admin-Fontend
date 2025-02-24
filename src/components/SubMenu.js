import {Link} from "react-router-dom";

function SubMenu(props) {
    return (
        <nav className="navbar bg-kicks top-Submenu w-100 border border-0">
            <div className="container-fluid">
                <form className="d-flex" role="search">
                    <Link className="btn btnhover-232321 border border-1 border-dark me-2" to="/other/category">
                        category
                    </Link>
                    <Link className="btn btnhover-232321 border border-1 border-dark me-2" to="/other/size">
                        size
                    </Link>
                </form>
            </div>
        </nav>
    );
}

export default SubMenu;