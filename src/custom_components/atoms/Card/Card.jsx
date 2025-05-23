import React from "react";
import "./Card.css";

export const Card = ({
  children,
  width = "100%",
  height = "auto",
  maxWidth,
  maxHeight,
  color = "var(--mainColor)",
  display = "flex",
  padding = "20px",
  borderRadius = "10px",
  flexDirection = "row",
  alignItems = "center",
  justifyContent = "space-evenly",
  className,
  flexWrap = "wrap",
  margin,
  boxShadow,
}) => {
  return (
    <div
      className={`card-container ${className}`}
      style={{
        width,
        height,
        maxWidth,
        maxHeight,
        backgroundColor: color,
        display,
        padding,
        borderRadius,
        flexDirection,
        alignItems,
        justifyContent,
        flexWrap,
        margin,
        boxShadow,
      }}
    >
      {children}
    </div>
  );
};
