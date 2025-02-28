import React from "react";
import "./IconInput.css";

export const IconInput = ({
  type,
  placeholder,
  required,
  value,
  list,
  options = [],
  icon: Icon,
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
        list={list}
        onChange={onChange}
      />
      {list && (
        <datalist id={list}>
          {options.map((option) => (
            <option value={option} key={option} />
          ))}
        </datalist>
      )}
    </div>
  );
};
