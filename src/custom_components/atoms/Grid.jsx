import React from "react";

export const Grid = ({
  children,
  display,
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
        display,
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
