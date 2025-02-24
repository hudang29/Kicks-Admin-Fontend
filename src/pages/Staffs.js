import List from "../components/List";
import Pagination from "../components/Pagination";
import StaffsVM from "../viewmodels/StaffsVM";

const TableHeader = ["No.", "Name", "ID", "Email", "Role", "Status"];
const CardName = "Staffs"

function Staffs() {

    const {staff} = StaffsVM();

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
                        <button className="rounded rounded-2 px-5 py-2"
                                style={{backgroundColor: "#232321", color: "#FAFAFA"}}>
                            ADD NEW STAFF
                        </button>
                    </div>
                </div>
            </div>
            {/*-- component --*/}
            <List items={TableHeader}
                  information={staff}
                  CardName={CardName}/>

            <Pagination/>

        </>
    );
}

export default Staffs;