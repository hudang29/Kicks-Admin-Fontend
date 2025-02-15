import CardDetail from "./CardDetail";

function Bestseller() {
    return (
        <div className="card p-2">
            <div className="card-header bg-body mb-1">
                Best Sellers
            </div>
            <CardDetail></CardDetail>

            <CardDetail></CardDetail>

            <CardDetail></CardDetail>

            <div className="card-footer bg-body border border-0">
                <button className="btn btnhover-232321 border border-1 border-dark">
                    REPORT
                </button>
            </div>
        </div>
    );
}

export default Bestseller;