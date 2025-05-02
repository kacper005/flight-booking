import React from "react";

const LoadingSpinner = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img
        src="/loading.gif"
        alt="Loading..."
        style={{ width: "150px", height: "150px" }}
      />
    </div>
  );
};

export default LoadingSpinner;
