import React from "react";

export const ContentWrapper = ({ children }) => {
  return (
    <div
      style={{
        padding: "20px 20px 0 20px",
        display: "flex",
        alignContent: "center",
        justifyContent: "center",
      }}
    >
      {children}
    </div>
  );
};
