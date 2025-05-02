import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@context/AuthContext";
import LoadingSpinner from "./LoadingSpinner";

const ProtectedRoute = ({ redirectTo = "/sign-in" }) => {
  const { isLoggedIn, loading } = useAuth();

  if (loading) return <LoadingSpinner />;

  return isLoggedIn ? <Outlet /> : <Navigate to={redirectTo} />;
};

export default ProtectedRoute;
