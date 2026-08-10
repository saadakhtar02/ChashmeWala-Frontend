import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = () => {
    const adminToken = localStorage.getItem("token");

    return adminToken ? (
        <Outlet />
    ) : (
        <Navigate to="/admin/login" />
    );
};

export default ProtectedRoute;
