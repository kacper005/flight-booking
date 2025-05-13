import React from "react";

export const Button = ({
  children,
  type = "button",
  width,
  height,
  maxWidth,
  maxHeight,
  bgColor = "var(--mainColorLight)",
  hoverBgColor = "var(--blueHover)",
  disabledBgColor = "var(--disabledColor)",
  color = "var(--textColor2)",
  disabledColor = "var(--textColor2)",
  textAlign,
  padding = "10px 20px",
  margin,
  border = "none",
  borderRadius = "5px",
  cursor = "pointer",
  fontSize = "1.8rem",
  fontFamily = "Montserrat, sans-serif",
  onClick,
  icon: Icon,
  disabled,
}) => {
  const [isHovered, setIsHovered] = React.useState(false);

  const currentBgColor = disabled
    ? disabledBgColor
    : isHovered
    ? hoverBgColor
    : bgColor;

  const currentColor = disabled ? disabledColor : color;

  return (
    <button
      style={{
        width: width,
        height: height,
        maxWidth: maxWidth,
        maxHeight: maxHeight,
        backgroundColor: currentBgColor,
        color: currentColor,
        textAlign: textAlign,
        padding: padding,
        margin: margin,
        border: border,
        borderRadius: borderRadius,
        cursor: disabled ? "not-allowed" : cursor,
        fontSize: fontSize,
        fontFamily: fontFamily,
      }}
      type={type}
      onClick={disabled ? undefined : onClick}
      onMouseEnter={() => !disabled && setIsHovered(true)}
      onMouseLeave={() => !disabled && setIsHovered(false)}
      disabled={disabled}
    >
      {Icon && (
        <span
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginRight: children ? "8px" : "0",
          }}
        >
          <Icon />
        </span>
      )}
      {children}
    </button>
  );
};
