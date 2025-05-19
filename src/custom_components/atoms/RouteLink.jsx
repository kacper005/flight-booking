import React from "react";
import { Link } from "react-router-dom";

export const RouteLink = ({
  to,
  children,
  float,
  margin,
  textDecoration = "none",
  color = "var(--textColor)",
}) => {
  return (
    <Link
      style={{
        color: color,
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
