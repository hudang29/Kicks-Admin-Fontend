import Sidebar from "../components/Sidebar";
import Menu from "../components/Menu";
import {Outlet} from "react-router-dom";
import Footer from "../components/Footer";

function MainLayout() {
    return (
        <div className="container-fuid bg-kicks-light" style={{minHeight: "100vh"}}>
            <div className="d-flex align-items-start">
                {/*<!-- Slide bar -->*/}
                <Sidebar/>
                {/*<!-- body -->*/}
                <div className="vstack" style={{maxWidth: "80vw"}}>
                    {/*<!-- menu -->*/}
                    <div className="position-sticky top-0 w-100 bg-white z-3">
                        <Menu/>
                    </div>
                    {/*----main---*/}
                    <div className="card rounded rounded-0 bg-kicks border border-0 px-4"
                         style={{minHeight: "90vh"}}>
                        <Outlet/>
                        {/*-- footer --*/}
                        <Footer/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainLayout;