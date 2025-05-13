import React from "react";
import { Link } from "react-router-dom";

export const RouteLink = ({
  to,
  children,
  float = "right",
  margin = "0 1.6rem",
  textDecoration = "none",
}) => {
  return (
    <Link
      style={{
        color: "var(--textColor)",
        textDecoration: textDecoration,
        float: float,
        margin: margin,
        fontSize: "1.6rem",
      }}
      to={to}
    >
      {children}
    </Link>
  );
};
