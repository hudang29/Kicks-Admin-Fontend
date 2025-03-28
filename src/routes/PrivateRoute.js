import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, roles }) => {
    const role = sessionStorage.getItem("role");

    if (!role) {
        return <Navigate to="/login" />;
    }

    if (roles && !roles.includes(role)) {
        return <Navigate to="/unauthorized" />;
    }

    return children;
};

export default PrivateRoute;
