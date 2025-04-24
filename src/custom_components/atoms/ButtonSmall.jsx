import React from "react";

export const ButtonSmall = ({
  children,
  width,
  height,
  maxWidth,
  maxHeight,
  bgColor = "var(--mainColorLight)",
  hoverBgColor = "var(--secondaryColor)",
  color = "var(--textColor2)",
  textAlign,
  padding = "5px 21px",
  margin,
  border = "none",
  borderRadius = "5px",
  cursor = "pointer",
  fontSize = "1.6rem",
  fontFamily = "Montserrat, sans-serif",
  onClick,
  icon: Icon,
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
        fontFamily: fontFamily,
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
