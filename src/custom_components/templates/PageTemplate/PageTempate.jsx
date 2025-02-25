import React from "react";
import "./PageTemplate.css";

export const PageTemplate = ({ title, children }) => {
  return (
    <div className="page-template-container">
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
