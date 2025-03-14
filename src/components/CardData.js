
function CardData({information, titleData, icon}) {
    return (
        <div className="card h-100 ">
            <div className="card-header bg-body mb-2 border border-0">
                <span className="fw-semibold">{titleData}</span>
            </div>
            <div className="hstack mb-2 px-3">
                <div>
                    <span className="">
                        {icon} <span className="h5 ms-2">{information}</span>
                    </span>
                </div>
                <div className="ms-auto visually-hidden">
                    <span>
                        <i className="bi bi-arrow-up"></i>34.5%
                    </span>
                </div>
            </div>
            <div className="card-footer bg-body border border-0 ms-auto invisible">
                <p><small className="text-body-secondary">compared to Jan 2022</small></p>
            </div>
        </div>
    )
}

export default CardData;