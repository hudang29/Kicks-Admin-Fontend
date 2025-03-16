import List from "../components/List";
import StaffsVM from "../viewmodels/StaffsVM";
import {Link} from "react-router-dom";
import LoadingPage from "../components/LoadingPage";

const TableHeader = ["No.", "Name", "Phone", "Email", "Role", "Status", "Create at", "Action"];

function Staffs() {

    const {staffList, loading} = StaffsVM();

    return (
        <>
            <LoadingPage
                props={loading}/>
            <div className="my-3">
                <p className="fw-semibold fs-2">Staff</p>
                <div className="hstack">
                    <div className="p-1">
                        <nav style={{"--bs-breadcrumb-divider": "'>'"}} aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><a href="#" className="nav-link">Home</a></li>
                                <li className="breadcrumb-item active" aria-current="page">Staff List</li>
                            </ol>
                        </nav>
                    </div>
                    <div className="ms-auto">
                        <Link to="/newstaff" className="nav-link rounded rounded-2 px-5 py-2 btn-kicks-dark">
                            ADD NEW STAFF
                        </Link>
                    </div>
                </div>
            </div>
            <List items={TableHeader}
                  information={staffList}
                  CardName=""/>
        </>
    );
}

export default Staffs;