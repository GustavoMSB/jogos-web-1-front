import React from "react";
import { Navigate, Route, Routes as Switch } from "react-router-dom";
import { PrivateRoute } from "./private_route";
import { Home } from "../pages/home";
import { Login } from "../pages/login";

export const Routes: React.FC = () => (
    <Switch>
        <Route element={<PrivateRoute />}>
            <Route path="" element={<Home />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" />} />
    </Switch>
);