import Chart from "../components/Chart";
import Bestseller from "../components/Bestseller";
import List from "../components/List";
import {useEffect} from "react";

const TableHeader = ["No.", "Product", "Date", "Payment Method", "Customer", "Status", "Amount"];
const CardName = "Recent Purchases"

function Dashboard() {

    useEffect(() => {
        document.title = "Dashboard";
    }, []);

    return (
        <>
            {/*-- header --*/}
            <div className="mb-3">
                <h3>Dashboard</h3>
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
            {/*-- component --*/}
            <div className="row row-cols-md-3 g-3 mb-3">
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
                                    <i className="bi bi-arrow-up"></i>34.5%
                                </span>
                            </div>
                        </div>
                        <div className="card-footer bg-body border border-0 ms-auto">
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

            <div className="row row-cols-md-2 g-3 mb-3">
                <div className="col-md-8">
                    <Chart/>
                </div>
                <div className="col-md-4">
                    <Bestseller/>
                </div>
            </div>
            <List items={TableHeader}
                  information={[]}
                  CardName={CardName}/>
        </>
    );
}

export default Dashboard;