import React from "react";

export const Button = ({
  children,
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
  disabled,
}) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <button
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
      disabled={disabled}
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
