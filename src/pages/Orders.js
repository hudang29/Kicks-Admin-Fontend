import List from "../components/List";
import Pagination from "../components/Pagination";
import OrdersVM from "../viewmodels/OrdersVM";
import {getStatusClass} from "../utils/Util";
import {Link} from "react-router-dom";

const TableHeader = ["No.", "Customer Name", "Order Date", "Payment Method", "Status", "Amount", "Action"];

function Orders() {
    const {orderList, statuses, handleFetchDataByStatus, showAllOrder} = OrdersVM();

    return (
        <>
            <div className="my-2">
                <p className="fw-semibold fs-2 mb-1">Order List</p>
                <div className="d-flex align-items-center mt-0">
                    <div className="">
                        <nav style={{"--bs-breadcrumb-divider": "'>'"}} aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><Link to="#" className="nav-link">Home</Link></li>
                                <li className="breadcrumb-item active" aria-current="page">Order List</li>
                            </ol>
                        </nav>
                    </div>
                </div>
                <hr/>
            </div>
            {/*-- component --*/}
            <List
                items={TableHeader}
                information={orderList ?? []}
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
                            <button className="btn btn-light ms-auto border border-1"
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