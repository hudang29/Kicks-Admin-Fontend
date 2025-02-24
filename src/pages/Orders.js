import List from "../components/List";
import Pagination from "../components/Pagination";
import OrdersVM from "../viewmodels/OrdersVM";

const TableHeader = ["No.", "Customer Name", "Date", "Payment Method", "Status", "Amount"];
const CardName = "Recent Purchases"

function Orders() {
    const {order} = OrdersVM();
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

                    <div className="ms-auto">select date</div>
                </div>
                <div className="rounded w-25 ms-auto">
                    <select className="form-select nonfocus" aria-label="Default select example">
                        <option selected>Change Status</option>
                        <option value="1">Delivered</option>
                        <option value="2">Canceled</option>
                    </select>
                </div>
            </div>
            {/*-- component --*/}
            <List
                items={TableHeader}
                information={order}
                CardName={CardName}/>

            <Pagination/>
        </>
    );
}

export default Orders;