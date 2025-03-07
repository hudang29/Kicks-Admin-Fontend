import DashboardVM from "../viewmodels/DashboardVM";
import {formatCurrency} from "../utils/Format";

function Bestseller() {
    const {bestSellers} = DashboardVM();
    return (
        <div className="card p-2">
            <div className="card-header bg-body mb-1">
                Best Sellers
            </div>
            {
                bestSellers.length > 0 ? (
                    bestSellers.map((bestSeller) => (
                        <div className="card card border border-0 mb-3">
                            <div className="row g-0">
                                <div className="col-md-3">
                                    <img src={bestSeller.productImage} className="img-fluid rounded-start square-img"
                                         alt="..."/>
                                </div>
                                <div className="col-md-9">
                                    <div className="card-body">
                                        <div className="vstack">
                                            <div className="hstack">
                                                <p>{bestSeller.productName}</p>
                                                <p className="ms-auto">{formatCurrency(bestSeller.productPrice)}</p>
                                            </div>
                                            <div className="hstack">
                                                <p className="text-body-secondary">{bestSeller.productColor}</p>
                                                <p className="ms-auto text-body-secondary">
                                                    {bestSeller.totalSold} Sales
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <></>
                )
            }
            <div className="card-footer bg-body border border-0">
                <button className="btn btnhover-232321 border border-1 border-dark">
                    REPORT
                </button>
            </div>
        </div>
    );
}

export default Bestseller;