import React from "react";

export const Grid = ({
  children,
  display,
  alignItems,
  justifyContent,
  padding,
  gap,
  lineHeight,
}) => {
  return (
    <div
      style={{ display, alignItems, justifyContent, padding, gap, lineHeight }}
    >
      {children}
    </div>
  );
};
