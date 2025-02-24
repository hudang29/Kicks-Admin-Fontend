
import {Outlet} from "react-router-dom";
import SubMenu from "../components/SubMenu";

function SubLayout() {
    return (
        <div className="container-fuid bg-kicks" style={{minHeight: "80vh"}}>
            <div className="position-sticky top-Submenu w-100 z-3">
                <SubMenu/>
            </div>
            <Outlet/>

        </div>
    );
}

export default SubLayout;