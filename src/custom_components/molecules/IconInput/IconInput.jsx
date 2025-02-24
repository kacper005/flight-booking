import React from "react";
import "./IconInput.css";

export const IconInput = ({
  type,
  placeholder,
  icon: Icon,
  required,
  value,
  onChange,
}) => {
  return (
    <div className="input-container">
      {Icon && (
        <span className="icon">
          <Icon />
        </span>
      )}
      <input
        type={type}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
