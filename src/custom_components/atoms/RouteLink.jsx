import React from "react";
import { Link } from "react-router-dom";

export const RouteLink = ({ to, children }) => {
  return (
    <Link
      style={{
        color: "var(--textColor)",
        textDecoration: "none",
        float: "right",
        margin: "0 1rem",
      }}
      to={to}
    >
      {children}
    </Link>
  );
};
