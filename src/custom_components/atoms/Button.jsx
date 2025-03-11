import React from "react";

export const Button = ({
  children,
  className,
  width,
  height,
  maxWidth,
  maxHeight,
  bgColor = "var(--mainColor)",
  color = "var(--textColor)",
  textAlign,
  padding = "10px 20px",
  margin,
  border = "none",
  borderRadius = "5px",
  cursor = "pointer",
  fontSize = "1.8rem",
  onClick,
  icon: Icon,
}) => {
  return (
    <button
      className={className}
      style={{
        width: width,
        height: height,
        maxWidth: maxWidth,
        maxHeight: maxHeight,
        backgroundColor: bgColor,
        color: color,
        textAlign: textAlign,
        padding: padding,
        margin: margin,
        border: border,
        borderRadius: borderRadius,
        cursor: cursor,
        fontSize: fontSize,
      }}
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
