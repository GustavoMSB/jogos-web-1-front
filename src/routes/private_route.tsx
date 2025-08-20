import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = () => {
    const acessToken = localStorage.getItem('token');
    const auth = { 'token': acessToken };
    return (
        (auth.token) ? <Outlet /> : <Navigate to="/login" />
    )
};