import {Bar} from "react-chartjs-2";
import {useCallback, useEffect, useState} from "react";
import {Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend} from "chart.js";
import DashboardAPI from "../api/DashboardAPI";

// Register chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Chart() {

    const [salesData, setSalesData] = useState([]);
    const [salesDataYearly, setSalesDataYearly] = useState([]);
    const [viewType, setViewType] = useState("month");
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

    //Hàm fetch dữ liệu tổng doanh thu
    const fetchSalesGraphData = useCallback(async () => {
        try {
            const response = await DashboardAPI.getSalesGraphByYear();
            setSalesData(response ?? []); // Tránh lỗi nếu response null
        } catch (error) {
            console.error("Lỗi khi tải dữ liệu biểu đồ:", error);
        }
    }, []);

    //Hàm fetch dữ liệu theo năm
    const fetchSalesGraphDataByYear = useCallback(async (year) => {
        try {
            const response = await DashboardAPI.getSalesGraphByMonth(year);
            setSalesDataYearly(response ?? []); // Tránh lỗi nếu response null
        } catch (error) {
            console.error("Lỗi khi tải dữ liệu biểu đồ theo năm:", error);
        }
    }, []);

    // Gọi API lần đầu khi component mount
    useEffect(() => {
        fetchSalesGraphData();
    }, [fetchSalesGraphData]);

    // Gọi API khi selectedYear thay đổi
    useEffect(() => {
        fetchSalesGraphDataByYear(selectedYear);
    }, [fetchSalesGraphDataByYear, selectedYear]);

    // Dữ liệu biểu đồ theo năm
    const chartDataMonthly = {
        labels: salesData ? (salesData?.map((data) => `Year ${data.period}`)) : "",
        datasets: [
            {
                label: "Revenue (VND)",
                data: salesData ? (salesData?.map((data) => data.totalRevenue) ) : "",
                backgroundColor: "rgba(75, 192, 192, 0.6)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
            },
        ],
    };

    // Dữ liệu biểu đồ theo Tháng
    const chartDataYearly = {
        labels: salesDataYearly ? (salesDataYearly.map((data) => `Month ${data.period}`)) : "",
        datasets: [
            {
                label: "Revenue (VND)",
                data: salesDataYearly ? (salesDataYearly.map((data) => data.totalRevenue)) : "",
                backgroundColor: "rgba(255, 99, 132, 0.6)",
                borderColor: "rgba(255, 99, 132, 1)",
                borderWidth: 1,
            },
        ],
    };


    return (
        <div className="card h-100">
            <div className="container mt-4">

                {/* Nút chọn hiển thị biểu đồ và chọn năm */}
                <div className="d-flex justify-content-between mb-3">
                    <div className="hstack">
                        <button
                            className={`btn me-2 btnhover-232321 ${viewType === "year" ? "" : "btn-kicks-dark"}`}
                            onClick={() => setViewType("month")}>
                            Monthly Revenue
                        </button>
                        <button
                            className={`btn me-2 btnhover-232321 ${viewType === "year" ? "btn-kicks-dark" : ""}`}
                            onClick={() => setViewType("year")}>
                            Annual revenue
                        </button>
                    </div>
                    {viewType === "year" && (
                        <select
                            className="w-auto"
                            value={selectedYear}
                            onChange={(e) => setSelectedYear(e.target.value)}>
                            {Array.from({length: 5}, (_, i) => new Date().getFullYear() - i).map((year) => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </select>
                    )}
                </div>

                {/* Biểu đồ tổng doanh thu */}
                <div className="mb-4 p-3">
                    <h4>{viewType === "month" ? "Monthly Revenue" : `Annual revenue ${selectedYear}`}</h4>
                    <Bar data={viewType === "month" ? chartDataMonthly : chartDataYearly}/>
                </div>

            </div>
        </div>
    );
}

export default Chart;