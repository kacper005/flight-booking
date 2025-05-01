import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@context/AuthContext";

const ProtectedRoute = ({ redirectTo = "/sign-in", children }) => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return <Navigate to={redirectTo} />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
