import React from "react";

export const Card = ({ children, width, height, color }) => {
  return (
    <div style={{ width: width, height: height, backgroundColor: color, padding: "20px", borderRadius: "10px" }}>
      {children}
    </div>
  );
};