import CardData from "../components/CardData";
import List from "../components/List";
import OrderDetailVM from "../viewmodels/OrderDetailVM";
import OrdersVM from "../viewmodels/OrdersVM";
import {getStatusClass} from "../utils/Util";
import {Link} from "react-router-dom";
import LoadingPage from "../components/LoadingPage";

const TableHeader = ["No.", "Shoes", "Color", "Size", "Quantity", "Total"];

function OrderDetail() {
    const {orderDetail, loading,} = OrderDetailVM();
    const {employeeId, order, statuses, handleChangeStatus} = OrdersVM();

    return (
        <>
            <LoadingPage
                props={loading}/>
            <div className="my-2">
                <p className="fw-semibold fs-2 mb-1">Order Detail</p>
                <div className="d-flex align-items-center mt-0">
                    <div className="">
                        <nav style={{"--bs-breadcrumb-divider": "'>'"}} aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><Link to="#" className="nav-link">Home</Link></li>
                                <li className="breadcrumb-item"><Link to="#"
                                                                      className="nav-link d-inline-block">Orders</Link>
                                </li>
                                <li className="breadcrumb-item active" aria-current="page">Order Detail</li>
                            </ol>
                        </nav>
                    </div>
                </div>
                <hr/>
            </div>

            <div className="mb-3 bg-body px-3 rounded rounded-2">
                <div className="card my-3">
                    <div className="card-body">
                        <div className="d-flex flex-wrap align-items-center gap-2">
                            <span className="fw-semibold">Order ID: #{order.id} </span>
                            <span className={`badge text-bg-${getStatusClass(order?.orderStatus)}`}>
                                {order?.orderStatus}
                            </span>

                            <select className="form-select w-auto ms-auto" value={order?.orderStatus}
                                    onChange={(e) => {
                                        handleChangeStatus(e)
                                    }}
                            disabled={!employeeId || order?.orderStatus === `CANCELLED` || order?.orderStatus === `COMPLETED`}>
                                {statuses?.length > 0 &&
                                    statuses.map((item) => (
                                        <option key={item} value={item}>{item}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>
                </div>
                <div className="row row-cols-md-3 g-3 mb-3">
                    <div className="col">
                        <CardData
                            information={order?.customer}
                            titleData="Customer"
                            icon={<i className="bi bi-person-square fs-4"></i>}/>
                    </div>
                    <div className="col">
                        <CardData
                            information={order?.payment}
                            titleData="Payment"
                            icon={<i className="bi bi-credit-card fs-4"></i>}/>
                    </div>
                    <div className="col">
                        <CardData
                            information={order?.phone}
                            titleData="Phone"
                            icon={<i className="bi bi-telephone fs-4"></i>}/>
                    </div>
                </div>
            </div>


            <List items={TableHeader}
                  information={orderDetail}
                  CardName={<h5>Shoes</h5>}/>
        </>
    );
}

export default OrderDetail;