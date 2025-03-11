import React from "react";

export const Box = ({
  children,
  width,
  height,
  maxWidth,
  backgroundColor = "var(--secondaryColor)",
  padding = "20px",
  borderRadius = "10px",
  margin = "25px 0px 25px 0px",
}) => {
  return (
    <div
      style={{
        width: width,
        height: height,
        maxWidth: maxWidth,
        backgroundColor: backgroundColor,
        padding: padding,
        borderRadius: borderRadius,
        margin: margin,
      }}
    >
      {children}
    </div>
  );
};
