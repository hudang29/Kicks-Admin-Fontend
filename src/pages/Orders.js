import List from "../components/List";
import Pagination from "../components/Pagination";
import OrdersVM from "../viewmodels/OrdersVM";
import {getStatusClass} from "../utils/Util";

const TableHeader = ["No.", "Customer Name", "Order Date", "Payment Method", "Status", "Amount", "Action"];

function Orders() {
    const {order, statuses, handleFetchDataByStatus, showAllOrder} = OrdersVM();

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

                        <div className="d-flex flex-wrap gap-2 mb-3">
                            {
                                statuses?.length > 0 ? (
                                    statuses.map((item) => (
                                        <button className={`btn btn-${getStatusClass(item)}`}
                                                onClick={() => handleFetchDataByStatus(item)}>{item}
                                        </button>
                                    ))
                                ) : (
                                    <></>
                                )
                            }
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