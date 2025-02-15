// Hàm để đổi màu badge dựa trên trạng thái đơn hàng
const getStatusClass = (status) => {
    switch (status) {
        case "Chờ xử lý":
            return "bg-success text-white";
        case "Đang giao hàng":
            return "bg-warning text-dark";
        case "Shipped":
            return "bg-primary text-white";
        case "Cancelled":
            return "bg-danger text-white";
        default:
            return "bg-body";
    }
};

function StaffList(props) {

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
                            <td>{information.name}</td>
                            <td>{information.id}</td>
                            <td>{information.email}</td>
                            <td>{information.role}</td>
                            <td>{information.status}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default StaffList;

