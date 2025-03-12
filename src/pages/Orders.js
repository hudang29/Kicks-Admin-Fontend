import List from "../components/List";
import Pagination from "../components/Pagination";
import OrdersVM from "../viewmodels/OrdersVM";

const TableHeader = ["No.", "Customer Name", "Order Date", "Payment Method", "Status", "Amount", "Action"];

function Orders() {
    const {order, handleFetchDataByStatus, showAllOrder} = OrdersVM();
    return (
        <>
            <div className="my-3">
                <p className="fw-semibold fs-2">Order List</p>
                <div className="hstack">
                    <div className="p-1">
                        <nav style={{"--bs-breadcrumb-divider": "'>'"}} aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><a href="#" className="nav-link">Home</a></li>
                                <li className="breadcrumb-item active" aria-current="page">Order List</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>
            {/*-- component --*/}
            <List
                items={TableHeader}
                information={order}
                CardName={
                    <>

                        <div className="hstack gap-3 mb-3">
                            <button className="btn btn-warning"
                                    onClick={() => handleFetchDataByStatus("Pending")}>Pending
                            </button>
                            <button className="btn btn-primary"
                                    onClick={() => handleFetchDataByStatus("Confirmed")}>Confirmed
                            </button>
                            <button className="btn btn-secondary"
                                    onClick={() => handleFetchDataByStatus("Processing")}>Processing
                            </button>
                            <button className="btn btn-dark"
                                    onClick={() => handleFetchDataByStatus("Delivering")}>Delivering
                            </button>
                            <button className="btn btn-success"
                                    onClick={() => handleFetchDataByStatus("Completed")}>Completed
                            </button>
                            <button className="btn btn-danger"
                                    onClick={() => handleFetchDataByStatus("Cancelled")}>Cancelled
                            </button>
                            <button className="btn btn-light ms-auto"
                                    onClick={showAllOrder}>Show All
                            </button>
                        </div>

                        {/*<h5>{CardName}</h5>*/}
                    </>
                }/>

            <Pagination/>
        </>
    );
}

export default Orders;