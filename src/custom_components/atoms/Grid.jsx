import React from "react";

export const Grid = ({
  children,
  display,
  width,
  maxWidth,
  alignItems,
  justifyContent,
  flexDirection,
  padding,
  gap,
  lineHeight,
}) => {
  return (
    <div
      style={{
        width,
        display,
        maxWidth,
        alignItems,
        justifyContent,
        flexDirection,
        padding,
        gap,
        lineHeight,
      }}
    >
      {children}
    </div>
  );
};
