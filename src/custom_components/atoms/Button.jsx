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
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      className={className}
      onClick={onClick}
    >
      {Icon && (
        <span
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon />
        </span>
      )}
      {children}
    </button>
  );
};
