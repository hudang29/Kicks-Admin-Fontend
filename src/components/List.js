// Hàm để đổi màu badge dựa trên trạng thái đơn hàng
import {formatCurrency, formatDate} from "../utils/Format";
import {Link} from "react-router-dom";

const getStatusClass = (status) => {
    switch (status) {
        case "Chờ xử lý":
            return "badge bg-success text-white";
        case "Đang giao hàng":
            return "badge bg-warning text-dark";
        case "Shipped":
            return "badge bg-primary text-white";
        case "Cancelled":
            return "badge bg-danger text-white";
        default:
            return " ";
    }
};

function List(props) {

    return (
        <div className="card rounded p-2 mb-3">
            <div className="card-header bg-body">
                <h5>{props.CardName}</h5>
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
                    {props.information.map((information, index) => (
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
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
        ;
}

export default List;

