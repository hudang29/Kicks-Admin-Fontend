
function CardData({information, titleData}) {
    return (
        <div className="card">
            <div className="card-header bg-body mb-2 border border-0">
                <span className="fw-semibold">{titleData}</span>
            </div>
            <div className="hstack mb-2 px-3">
                <div>
                    <span className="">
                        <i className="bi bi-backpack-fill p-2 px-3 rounded-1 me-3"
                           style={{backgroundColor: "#4A69E2", color: "#FAFAFA;"}}></i>
                        <span className="h5">{information}</span>
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