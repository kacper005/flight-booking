import React from "react";

export const Select = ({ value, onChange }) => {
  return (
    <select
      style={{
        width: "100%",
        height: "60px",
        fontSize: "1.8rem",
        borderRadius: "8px",
        border: "1px solid var(--grey)",
        cursor: "pointer",
        padding: "10px 20px",
        fontFamily: '"Montserrat", sans-serif',
      }}
      value={value}
      onChange={onChange}
    >
      <option value="true">Round trip</option>
      <option value="false">One-way</option>
    </select>
  );
};
