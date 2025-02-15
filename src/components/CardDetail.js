
function CardDetail(props) {
    return (
        <div className="card card border border-0 mb-3">
            <div className="row g-0">
                <div className="col-md-4 border border-1">
                    <img src="..." className="img-fluid rounded-start" alt="..."/>
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <div className="hstack">
                            <div>
                                <p>{props.name}</p>
                            </div>
                            <div className="ms-auto">
                                <p></p>
                            </div>
                        </div>
                        <div className="hstack">
                            <div>
                                <p><small className="text-body-secondary">{props.color}</small></p>
                            </div>
                            <div className="ms-auto">
                                <p><small className="text-body-secondary"></small></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CardDetail;