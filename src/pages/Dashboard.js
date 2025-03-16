import Chart from "../components/Chart";
import Bestseller from "../components/Bestseller";
import List from "../components/List";
import {useEffect} from "react";
import DashboardVM from "../viewmodels/DashboardVM";
import {formatCurrency} from "../utils/Format";
import CardData from "../components/CardData";
import LoadingPage from "../components/LoadingPage";

const TableHeader = ["No.", "Product", "Date", "Payment Method", "Customer", "Status", "Amount"];
const TableLowStock = ["No.", "Product", "Color", "Size", "Stock", "Action"];

function Dashboard() {

    useEffect(() => {
        document.title = "Dashboard";
    }, []);
    const {
        loading,
        handleFindLowStock,
        lowStock, stock, setStock,
        totalRevenue, totalOrders, latestOrders
    } = DashboardVM();
    return (
        <>
            <LoadingPage
                props={loading}
            />
            <div className="my-3">
                <p className="fw-semibold fs-2">Dashboard</p>
                <div className="hstack">
                    <div className="p-1">
                        <nav style={{"--bs-breadcrumb-divider": "'>'"}} aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item"><a href="#" className="nav-link">Home</a>
                                </li>
                                <li className="breadcrumb-item active" aria-current="page">Dashboard</li>
                            </ol>
                        </nav>
                    </div>

                    <div className="ms-auto">select date</div>
                </div>
            </div>
            <div className="row row-cols-md-4 g-3 mb-3">
                <div className="col">
                    <CardData
                        information={formatCurrency(totalRevenue)}
                        titleData="Revenue this month"
                        icon={<i className="bi bi-wallet fs-4"></i>}/>
                </div>
                <div className="col">
                    <CardData
                        information={formatCurrency(totalOrders)}
                        titleData="Total order amount"
                        icon={<i className="bi bi-wallet fs-4"></i>}/>
                </div>
                <div className="col">
                    <CardData
                        information="0"
                        titleData="Order ancelled"
                        icon={<i className="bi bi-wallet fs-4"></i>}/>
                </div>
                <div className="col">
                    <CardData
                        information="0"
                        titleData="Monthly shoe sales"
                        icon={<i className="bi bi-receipt-cutoff fs-4"></i>}/>
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
                              <button type="button" className="btn btn-light border border-1"
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