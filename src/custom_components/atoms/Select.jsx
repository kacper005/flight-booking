import React from "react";

export const Select = ({ value, onChange }) => {
  return (
    <select
      style={{
        width: "100%",
        height: "60px",
        fontSize: "1.8rem",
        borderRadius: "8px",
        border: "1px solid #cccccc",
        cursor: "pointer",
        padding: "10px 20px",
      }}
      value={value}
      onChange={onChange}
    >
      <option value="0">Round trip</option>
      <option value="1">One-way</option>
    </select>
  );
};
