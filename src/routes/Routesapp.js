import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Layout from "../layouts/MainLayout";
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
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import OrderDetail from "../pages/OrderDetail";
import Coupon from "../pages/Coupon";
import Supplier from "../pages/Supplier";
import Unauthorized from "../pages/Unauthorized";
import PrivateRoute from "./PrivateRoute";

const Admin = ["ADMIN"];
const notStaff = ["ADMIN", "MANAGER"];
const All = ["ADMIN", "STAFF", "MANAGER"];

function RoutesApp() {
    return (
        <Router>
            <Routes>
                <Route index element={<Login/>}/>
                <Route path="/login" element={<Login/>}/>

                <Route path="/" element={<Layout/>}>
                    <Route path="/unauthorized" element={<Unauthorized/>}/>
                    <Route path="profile" element={<Profile/>}/>

                    <Route path="dashboard" element={
                        <PrivateRoute roles={Admin}>
                            <Dashboard/>
                        </PrivateRoute>}/>

                    <Route path="staffs" element={
                        <PrivateRoute roles={notStaff}>
                            <Staffs/>
                        </PrivateRoute>}/>
                    <Route path="newstaff" element={
                        <PrivateRoute roles={notStaff}>
                            <StaffNew/>
                        </PrivateRoute>
                    }/>
                    <Route path="staff-detail/:id" element={
                        <PrivateRoute roles={notStaff}>
                            <StaffDetail/>
                        </PrivateRoute>
                    }/>

                    <Route path="allproducts" element={
                        <PrivateRoute roles={All}>
                            <Products/>
                        </PrivateRoute>}/>
                    <Route path="orderlist" element={
                        <PrivateRoute roles={All}>
                            <Orders/>
                        </PrivateRoute>}/>
                    <Route path="order-detail/:orderId" element={
                        <PrivateRoute roles={All}>
                            <OrderDetail/>
                        </PrivateRoute>}/>
                    <Route path="coupon" element={
                        <PrivateRoute roles={All}>
                            <Coupon/>
                        </PrivateRoute>}/>
                    <Route path="supplier" element={
                        <PrivateRoute roles={All}>
                            <Supplier/>
                        </PrivateRoute>}/>
                    <Route path="categories" element={
                        <PrivateRoute roles={All}>
                            <Categories/>
                        </PrivateRoute>}/>
                    <Route path="size" element={
                        <PrivateRoute roles={All}>
                            <Size/>
                        </PrivateRoute>}/>
                    <Route path="newproduct" element={
                        <PrivateRoute roles={All}>
                            <ProductNew/>
                        </PrivateRoute>}/>
                    <Route path="product/:id" element={
                        <PrivateRoute roles={All}>
                            <ProductDetail/>
                        </PrivateRoute>}/>
                    <Route path="product-detail/:detailId" element={
                        <PrivateRoute roles={All}>
                            <ProductForm/>
                        </PrivateRoute>}/>
                </Route>
            </Routes>
        </Router>
    );
}

export default RoutesApp;