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
  transition = "background-color 0.2s ease, transform 0.1s ease",
  transformStyle,
  onClick,
  icon: Icon,
  disabled,
}) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const [isActive, setIsActive] = React.useState(false);

  const currentBgColor = disabled
    ? disabledBgColor
    : isHovered
    ? hoverBgColor
    : bgColor;

  const currentColor = disabled ? disabledColor : color;

  const computedTransform =
    transformStyle ??
    (isActive ? "scale(0.95)" : isHovered ? "scale(1.05)" : "scale(1)");

  return (
    <button
      style={{
        width,
        height,
        maxWidth,
        maxHeight,
        backgroundColor: currentBgColor,
        color: currentColor,
        textAlign,
        padding,
        margin,
        border,
        borderRadius,
        cursor: disabled ? "not-allowed" : cursor,
        fontSize,
        fontFamily,
        transition,
        transform: computedTransform,
      }}
      type={type}
      onClick={disabled ? undefined : onClick}
      onMouseEnter={() => !disabled && setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsActive(false);
      }}
      onMouseDown={() => !disabled && setIsActive(true)}
      onMouseUp={() => setIsActive(false)}
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
