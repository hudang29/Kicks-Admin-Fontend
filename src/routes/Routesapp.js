import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "../layouts/Mainlayout";
import Dashboard from "../pages/Dashboard";
import Products from "../pages/Products";
import Staffs from "../pages/Staffs";
import Orders from "../pages/Orders";
import Categories from "../pages/Categories";
import ProductNew from "../pages/Productnew";
import ProductDetail from "../pages/Productdetail";
import ProductForm from "../pages/ProductForm";

function RoutesApp() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index path="dashboard" element={<Dashboard />}/> {/* Trang mặc định */}
                    <Route path="allproducts" element={<Products />} />
                    <Route path="staffs" element={<Staffs />} />
                    <Route path="orderlist" element={<Orders />} />
                    <Route path="categories" element={<Categories />} />
                    <Route path="newproduct" element={<ProductNew />} />
                    <Route path="product/:id" element={<ProductDetail />} />
                    <Route path="/product-detail/:id" element={<ProductForm />} />
                </Route>
            </Routes>
        </Router>
    );
}
export default RoutesApp;