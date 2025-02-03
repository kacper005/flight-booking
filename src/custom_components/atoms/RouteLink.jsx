import React from "react";
import { Link } from "react-router-dom";

export const RouteLink = ({ to, children }) => {
  return (
    <Link style={{ color: "white", textDecoration: "none", padding: "0 10px" }} to={to}>
      {children}
    </Link>
  );
}