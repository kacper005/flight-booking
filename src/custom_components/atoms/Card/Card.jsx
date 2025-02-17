import React from "react";
import "./Card.css";

export const Card = ({
  children,
  width = "auto",
  height = "auto",
  color,
  display = "flex",
  alignItems = "center",
  justifyContent = "space-between",
  className = "",
  flexWrap = "wrap",
}) => {
  return (
    <div
      className={`card-container ${className}`}
      style={{
        width,
        height,
        backgroundColor: color,
        padding: "20px",
        borderRadius: "10px",
        display,
        alignItems,
        justifyContent,
        flexWrap,
      }}
    >
      {children}
    </div>
  );
};
