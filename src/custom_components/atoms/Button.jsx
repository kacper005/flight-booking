import React from "react";

export const Button = ({
  className,
  children,
  bgColor = "#3D52A0",
  width,
  height,
  onClick,
  icon: Icon,
}) => {
  return (
    <button
      style={{
        backgroundColor: bgColor,
        color: "white",
        padding: "10px 20px",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        width: width,
        height: height,
        fontSize: "16px",
      }}
      className={className}
      onClick={onClick}
    >
      {Icon && <Icon />}
      {children}
    </button>
  );
};

// TODO: Add prop types and icon support for Button component
