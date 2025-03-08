import React from "react";

export const Box = ({
  children,
  backgroundColor = "var(--secondaryColor)",
  padding = "20px",
  borderRadius = "10px",
  margin = "25px 0px 25px 0px",
}) => {
  return (
    <div
      style={{
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
