import React from "react";
import "./Input.css";

export const Input = ({ type, placeholder, required, value, onChange }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      required={required}
      value={value}
      onChange={onChange}
    />
  );
};
