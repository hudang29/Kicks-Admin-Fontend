import List from "../components/List";
import Pagination from "../components/Pagination";
import StaffsVM from "../viewmodels/StaffsVM";
import {Link} from "react-router-dom";

const TableHeader = ["No.", "Name", "Email", "Phone", "Role", "Status", "Create at", "Action"];
const CardName = "Staffs"

function Staffs() {

    const {staffList} = StaffsVM();

    return (
        <>
            <div className="mb-3">
                <h3>Staff List</h3>
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
            {/*-- component --*/}
            <List items={TableHeader}
                  information={staffList}
                  CardName={CardName}/>

            <Pagination/>

        </>
    );
}

export default Staffs;