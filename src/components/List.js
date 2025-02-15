// Hàm để đổi màu badge dựa trên trạng thái đơn hàng
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
                            <td>{information.customer ?? information.name}</td>
                            <td>{information.orderDate ?? information.id}</td>
                            <td>{information.payment ?? information.email}</td>
                            <td>
                                <span className={getStatusClass(information.orderStatus)}>
                                        {information.orderStatus ?? information.role}
                                </span>
                            </td>
                            <td>{information.totalAmount ?? (information.status? ("Còn làm") : ("Nghỉ việc"))}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default List;

