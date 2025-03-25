import React from "react";

export const Box = ({
  children,
  width,
  height,
  maxWidth,
  backgroundColor,
  padding = "20px",
  borderRadius = "10px",
  borderColor,
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
        borderColor: borderColor,
        margin: margin,
      }}
    >
      {children}
    </div>
  );
};
