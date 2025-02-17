import React from "react";

export const PageTemplate = ({ title, children }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "50%",
        padding: "20px",
      }}
    >
      <div>
        <h1 style={{ margin: "20px", color: "var(--textColorLight)" }}>
          {title}
        </h1>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {children}
      </div>
    </div>
  );
};
