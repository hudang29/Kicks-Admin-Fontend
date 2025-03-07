// Hàm để đổi màu badge dựa trên trạng thái đơn hàng
import {formatCurrency, formatDate} from "../utils/Format";
import {Link} from "react-router-dom";

const getStatusClass = (status) => {
    switch (status) {
        case "Pending":
            return "badge text-bg-warning";
        case "Confirmed":
            return "badge text-bg-primary";
        case "Processing":
            return "badge text-bg-secondary";
        case "Delivering":
            return "badge text-bg-dark";
        case "Completed":
            return "badge text-bg-success";
        case "Cancelled":
            return "badge text-bg-danger";
        default:
            return " ";
    }
};

function List(props) {
    return (
        <div className="card rounded p-2 mb-3">
            <div className="card-header bg-body">
                <div>{props.CardName}</div>
            </div>
            <div className="table-responsive">
                <table className="table table-hover">
                    <thead className="table-dark">
                    <tr>
                        {
                            props.items.map((item) => (
                                <th>{item}</th>
                            ))
                        }
                    </tr>
                    </thead>
                    <tbody>
                    {props.information.length > 0 ? (
                        props.information.map((information, index) => (
                            <tr key={information.id}>
                                <th scope="row">{index + 1}</th>
                                {information.totalAmount && (
                                    <>
                                        <td>{information.customer ?? null}</td>
                                        <td>{formatDate(information.orderDate)}</td>
                                        <td>{information.payment ?? null}</td>
                                        <td>
                                        <span className={getStatusClass(information.orderStatus)}>
                                            {information.orderStatus ?? null}
                                        </span>
                                        </td>
                                        <td>{formatCurrency(information.totalAmount)}</td>
                                        <td><Link to="#" className="btn btn-danger">View</Link></td>
                                    </>
                                )}
                                {information.role && (
                                    <>
                                        <td>{information.name}</td>
                                        <td>{information.phone}</td>
                                        <td>{information.email}</td>
                                        <td>{information.role}</td>
                                        <td>{information.status ? ("Còn làm") : ("Nghỉ việc")}</td>
                                        <td>{formatDate(information.createAt)}</td>
                                        <td><Link to={`/staff-detail/${information.id}`}
                                                  className="btn btn-danger">View</Link>
                                        </td>
                                    </>
                                )}
                                {information.totalStock && (
                                    <>
                                        <td>{information.productName}</td>
                                        <td>{information.productColor}</td>
                                        <td>{information.productSize}</td>
                                        <td>{information.totalStock}</td>
                                        <td><Link to={`/product-detail/${information.productDetailId}`}
                                                  className="btn btn-danger">View</Link>
                                        </td>
                                    </>
                                )}
                            </tr>
                        ))
                    ) : (
                        <></>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    )
        ;
}

export default List;

