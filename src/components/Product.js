import {Link} from "react-router-dom";

function Product(props) {
    return (
        <div className="card p-3" key={props.id}>
            <div className="row g-0">
                <div className="col-md-4">
                    <img src={""} className="img-fluid rounded-start" alt={"..."}/>
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <div className="hstack">
                            <div>
                                <p className="bg-body-secondary">{props.name}</p>
                            </div>
                            <div className="ms-auto">
                                <Link to={`/productdetail/${props.id}`}
                                      className="nav-link mb-3 px-1 rounded rounded-1 btnhover-232321 bg-body-secondary">
                                    <i className="bi bi-three-dots"></i>
                                </Link>
                            </div>
                        </div>
                        <div className="hstack">
                            <div>
                                <p><small className="text-body-secondary">{props.category}</small></p>
                            </div>
                            <div className="ms-auto">
                                <p><small className="text-body-secondary">{props.price}</small></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card-body">
                <h5 className="card-title">Summary</h5>
                <p className="card-text">{props.description}</p>
            </div>
            <div className="card">
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">An item</li>
                    <li className="list-group-item">A second item</li>
                </ul>
            </div>
        </div>
    )
        ;
}

export default Product;