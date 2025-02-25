import React from "react";
import "./Card.css";

export const Card = ({
  children,
  width = "auto",
  height = "auto",
  color = "var(--secondaryColor)",
  display = "flex",
  padding = "20px",
  borderRadius = "10px",
  flexDirection = "row",
  alignItems = "center",
  justifyContent = "space-evenly",
  className,
  flexWrap = "wrap",
}) => {
  return (
    <div
      className={`card-container ${className}`}
      style={{
        width,
        height,
        backgroundColor: color,
        display,
        padding,
        borderRadius,
        flexDirection,
        alignItems,
        justifyContent,
        flexWrap,
      }}
    >
      {children}
    </div>
  );
};
