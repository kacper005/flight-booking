import React from "react";

export const ButtonSmall = ({
  children,
  title,
  width,
  height,
  maxWidth,
  maxHeight,
  bgColor = "var(--mainColorLight)",
  hoverBgColor = "var(--blueHover)",
  color = "var(--textColor2)",
  textAlign,
  padding = "5px 21px",
  margin,
  border = "none",
  borderRadius = "5px",
  cursor = "pointer",
  fontSize = "1.6rem",
  fontFamily = "Montserrat, sans-serif",
  transition = "background-color 0.2s ease, transform 0.1s ease",
  transformStyle,
  onClick,
  icon: Icon,
}) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const [isActive, setIsActive] = React.useState(false);

  const computedTransform =
    transformStyle ??
    (isActive ? "scale(0.95)" : isHovered ? "scale(1.05)" : "scale(1)");

  return (
    <button
      title={title}
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
        fontFamily: fontFamily,
        transition,
        transform: computedTransform,
      }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsActive(false);
      }}
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
