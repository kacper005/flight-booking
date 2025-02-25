import React from "react";

export const Select = ({ options, width, height }) => {
  return (
    <select
      style={{
        width: "220px",
        height: "40px",
        outline: "none",
        borderRadius: "5px",
        border: "1px solid #ccc",
        paddingLeft: "15px",
        fontSize: "16px",
        margin: "2px",
      }}
    >
      <option value="0">Round trip</option>
      <option value="1">One-way</option>
    </select>
  );
};
