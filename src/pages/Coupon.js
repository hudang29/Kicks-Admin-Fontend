import CouponVM from "../viewmodels/CouponVM";
import {formatDate} from "../utils/Format";
import LoadingPage from "../components/LoadingPage";

function Coupon() {

    const {allCoupon, loading, coupon, setCoupon, handleCreate} = CouponVM();

    return (
        <>
            <LoadingPage
                props={loading}/>
            <div className="my-2">
                <p className="fw-semibold fs-2 mb-1">Coupon</p>
                <div className="d-flex align-items-center mt-0">
                    <div className="">
                        <nav style={{"--bs-breadcrumb-divider": "'>'"}} aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><a href="#" className="nav-link">Home</a></li>
                                <li className="breadcrumb-item active" aria-current="page">Coupon</li>
                            </ol>
                        </nav>
                    </div>
                </div>

                <div className="d-flex">

                    <button type="button" className="btn btn-kicks-dark w-auto ms-auto"
                            data-bs-toggle="modal"
                            data-bs-target="#staticBackdrop">
                        Create coupon
                    </button>

                    <div className="modal fade" id="staticBackdrop"
                         data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1"
                         aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="staticBackdropLabel">Modal title</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal"
                                            aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <div className="row g-3">
                                        <div className="col-12">
                                            <input type="text" className="form-control" placeholder="Theme"
                                                   aria-label="Theme"
                                                   value={coupon.name}
                                                   onChange={(e) =>
                                                       setCoupon(prevState =>
                                                           ({...prevState, name: e.target.value})
                                                       )}/>
                                        </div>
                                        <div className="col-12">
                                        <textarea className="form-control" id="exampleFormControlTextarea1"
                                                  rows="3"
                                                  placeholder="Description"
                                                  aria-label="Description"
                                                  value={coupon.description}
                                                  onChange={(e) =>
                                                      setCoupon(prevState =>
                                                          ({...prevState, description: e.target.value})
                                                      )}
                                        ></textarea>
                                        </div>
                                        <div className="col-6">
                                            <input type="text" className="form-control" placeholder="Limit"
                                                   aria-label="Limit"
                                                   value={coupon.usageLimit}
                                                   onChange={(e) =>
                                                       setCoupon(prevState =>
                                                           ({...prevState, usageLimit: e.target.value})
                                                       )}
                                            />
                                        </div>
                                        <div className="col-6">
                                            <input type="text" className="form-control" placeholder="Rate"
                                                   aria-label="Rate"
                                                   value={coupon.discountRate}
                                                   onChange={(e) =>
                                                       setCoupon(prevState =>
                                                           ({...prevState, discountRate: e.target.value})
                                                       )}
                                            />
                                        </div>
                                        <div className="col-6">
                                            <input type="date" className="form-control"
                                                   value={coupon.startDate}
                                                   onChange={(e) =>
                                                       setCoupon(prevState =>
                                                           ({...prevState, startDate: e.target.value})
                                                       )}
                                            />
                                        </div>
                                        <div className="col-6">
                                            <input type="date" className="form-control"
                                                   value={coupon.endDate}
                                                   onChange={(e) =>
                                                       setCoupon(prevState =>
                                                           ({...prevState, endDate: e.target.value})
                                                       )}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close
                                    </button>
                                    <button type="button" className="btn btn-primary"
                                            onClick={handleCreate}>Create
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr/>
            </div>

            <div className="row row-cols-4">
                {
                    allCoupon?.length > 0 ? (
                        allCoupon?.map(c => (
                            <div className="col" key={c?.id}>
                                <div className="card">
                                    <div className="card-header">
                                        <span className="">{c?.couponCode}</span>
                                    </div>
                                    <div className="card-body">
                                        <p className="card-text">{c?.description}</p>
                                        <div className="card">
                                            <ul className="list-group list-group-flush">
                                                <li className="list-group-item d-flex text-black bg-body-secondary">
                                                    <span>Limit: {c?.usageLimit}</span>
                                                    <span className="ms-auto">Rate: {c?.discountRate} %</span>
                                                </li>
                                                <li className="list-group-item d-flex text-black bg-body-secondary">
                                                    <span>{formatDate(c?.startDate)}</span>
                                                    <span className="ms-auto">{formatDate(c?.endDate)}</span>
                                                </li>
                                            </ul>
                                        </div>

                                    </div>
                                    <div className="card-footer text-body-secondary">
                                        <span>{formatDate(c?.createdAt)}</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <></>
                    )
                }

            </div>
        </>
    );
}

export default Coupon;