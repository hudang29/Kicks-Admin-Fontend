import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "../layouts/MainLayout";
import SubLayout from "../layouts/SubLayout";
import Dashboard from "../pages/Dashboard";
import Products from "../pages/Products";
import Staffs from "../pages/Staffs";
import Orders from "../pages/Orders";
import Categories from "../pages/Categories";
import ProductNew from "../pages/ProductNew";
import ProductDetail from "../pages/ProductDetail";
import ProductForm from "../pages/ProductForm";
import Size from "../pages/Size";
import StaffDetail from "../pages/StaffDetail";
import StaffNew from "../pages/StaffNew";

function RoutesApp() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index path="dashboard" element={<Dashboard />}/> {/* Trang mặc định */}
                    <Route path="allproducts" element={<Products />} />
                    <Route path="staffs" element={<Staffs />} />
                    <Route path="newstaff" element={<StaffNew />} />
                    <Route path="staff-detail/:id" element={<StaffDetail />} />
                    <Route path="orderlist" element={<Orders />} />
                    <Route path="other/" element={<SubLayout />} >
                        <Route path="category" element={<Categories />} />
                        <Route path="size" element={<Size />} />
                    </Route>
                    <Route path="newproduct" element={<ProductNew />} />
                    <Route path="product/:id" element={<ProductDetail />} />
                    <Route path="product-detail/:id" element={<ProductForm />} />
                </Route>
            </Routes>
        </Router>
    );
}
export default RoutesApp;