import Chart from "../components/Chart";
import Bestseller from "../components/Bestseller";
import List from "../components/List";
import {useEffect} from "react";
import DashboardVM from "../viewmodels/DashboardVM";
import {formatCurrency} from "../utils/Format";

const TableHeader = ["No.", "Product", "Date", "Payment Method", "Customer", "Status", "Amount"];
const TableLowStock = ["No.", "Product", "Color", "Size", "Stock", "Action"];

function Dashboard() {

    useEffect(() => {
        document.title = "Dashboard";
    }, []);
    const {
        handleFindLowStock,
        lowStock, stock, setStock,
        totalRevenue, totalOrders, latestOrders
    } = DashboardVM();
    return (
        <>
            <div className="my-3">
                <p className="fw-semibold fs-2">Dashboard</p>
                <div className="hstack">
                    <div className="p-1">
                        <nav style={{"--bs-breadcrumb-divider": "'>'"}} aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><a href="#" className="nav-link">Home</a></li>
                                <li className="breadcrumb-item active" aria-current="page">Dashboard</li>
                            </ol>
                        </nav>
                    </div>

                    <div className="ms-auto">select date</div>
                </div>
            </div>
            <div className="row row-cols-md-3 g-3 mb-3">
                <div className="col">
                    <div className="card">
                        <div className="card-header bg-body mb-2 border border-0">
                            Total Revenue
                        </div>
                        <div className="hstack mb-2 px-3">
                            <div>
                                <span className="">
                                    <i className="bi bi-backpack-fill p-2 px-3 rounded-1 me-3"
                                       style={{backgroundColor: "#4A69E2", color: "#FAFAFA;"}}></i>
                                    <span className="h5">{formatCurrency(totalRevenue)}</span>
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
                </div>
                <div className="col">
                    <div className="card">
                        <div className="card-header bg-body mb-2 border border-0">
                            Total Orders
                        </div>
                        <div className="hstack mb-2 px-3">
                            <div>
                                <span className="">
                                    <i className="bi bi-backpack-fill p-2 px-3 rounded-1 me-3"
                                       style={{backgroundColor: "#4A69E2", color: "#FAFAFA;"}}></i>
                                    <span className="h5">{formatCurrency(totalOrders)}</span>

                                </span>
                            </div>
                            <div className="ms-auto visually-hidden">
                                <span>
                                    <i className="bi bi-arrow-up"></i>
                                    34.5%
                                </span>
                            </div>
                        </div>
                        <div className="card-footer bg-body border border-0 ms-auto invisible">
                            <p><small className="text-body-secondary">compared to Jan 2022</small></p>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card">
                        <div className="card-header bg-body mb-2 border border-0">
                            Total Orders
                        </div>
                        <div className="hstack mb-2 px-3">
                            <div>
                                <span className="">
                                    <i className="bi bi-backpack-fill p-2 px-3 rounded-1"
                                       style={{backgroundColor: "#4A69E2", color: "#FAFAFA;"}}></i>
                                    $126.50
                                </span>
                            </div>
                            <div className="ms-auto">
                                <span>
                                    <i className="bi bi-arrow-up"></i>
                                    34.5%
                                </span>
                            </div>
                        </div>
                        <div className="card-footer bg-body border border-0 ms-auto">
                            <p><small className="text-body-secondary">compared to Jan 2022</small></p>
                        </div>
                    </div>
                </div>
            </div>
            <List items={TableLowStock}
                  information={lowStock}
                  CardName={
                      <>
                          <div className="hstack gap-3 my-3">
                              <input className="form-control me-auto" type="number"
                                     placeholder="Stock"
                                     min={0}
                                     value={stock}
                                     onChange={(e) => setStock(Number(e.target.value))}/>
                              <button type="button" className="btn btn-secondary"
                                      onClick={() => handleFindLowStock(Number(stock))}>Find
                              </button>
                              <div className="vr"></div>
                              <button type="button" className="btn btn-outline-danger"
                                      onClick={() => handleFindLowStock(10)}>Reset
                              </button>
                          </div>
                      </>
                  }/>
            <div className="row row-cols-md-2 g-3 mb-3">
                <div className="col-md-8">
                    <Chart/>
                </div>
                <div className="col-md-4">
                    <Bestseller/>
                </div>
            </div>
            <List items={TableHeader}
                  information={latestOrders}
                  CardName={<h5>Latest Orders</h5>}/>
        </>
    );
}

export default Dashboard;