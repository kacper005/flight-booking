import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@hooks/useAuth";

const AdminRoute = () => {
  const { isLoggedIn, user } = useAuth();

  if (!isLoggedIn || user?.role !== "ADMIN") {
    return <Navigate to="/not-found" />;
  }

  return <Outlet />;
};

export default AdminRoute;
