import React from "react";

export const Button = ({
  children,
  className = "custom-btn",
  width,
  height,
  maxWidth,
  maxHeight,
  bgColor = "var(--mainColorLight)",
  hoverBgColor = "var(--secondaryColor)",
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
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <button
      className
      style={{
        width: width,
        height: height,
        maxWidth: maxWidth,
        maxHeight: maxHeight,
        backgroundColor: isHovered ? hoverBgColor : bgColor,
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
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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
