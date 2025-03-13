import CardData from "../components/CardData";
import List from "../components/List";
import OrderDetailVM from "../viewmodels/OrderDetailVM";
import OrdersVM from "../viewmodels/OrdersVM";
import {getStatusClass} from "../utils/Util";

const TableHeader = ["No.", "Shoes", "Color", "Size", "Quantity", "Total"];

function OrderDetail() {
    const {orderDetail} = OrderDetailVM();
    const {order, statuses} = OrdersVM();

    return (
        <>
            <div className="my-3">
                <p className="fw-semibold fs-2">Dashboard</p>
                <div className="hstack">
                    <div className="p-1">
                        <nav style={{"--bs-breadcrumb-divider": "'>'"}} aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><a href="#" className="nav-link">Home</a></li>
                                <li className="breadcrumb-item active" aria-current="page">Dashboard</li>
                            </ol>
                        </nav>
                    </div>

                    <div className="ms-auto">select date</div>
                </div>
            </div>


            <div className="mb-3 bg-body px-3 rounded rounded-2">
                <div className="card my-3">
                    <div className="card-body">
                        <div className="d-flex flex-wrap align-items-center gap-2">
                            <span className="fw-semibold">Order ID: #{order.id} </span>
                            <span className={`badge text-bg-${getStatusClass(order?.orderStatus)}`}>
                                {order?.orderStatus}
                            </span>

                            <select className="form-select w-auto ms-auto" value={order?.orderStatus}>
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
                            titleData="Customer"/>
                    </div>
                    <div className="col">
                        <CardData
                            information={order?.payment}
                            titleData="Payment"/>
                    </div>
                    <div className="col">
                        <CardData
                            information={order?.phone}
                            titleData="Phone"/>
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