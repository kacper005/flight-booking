import React from "react";
import "./AirportIconInput.css";

export const AirportIconInput = ({
  className,
  width,
  type,
  placeholder,
  required,
  disabled,
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
        className={`${className}`}
        width={width}
        type={type}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        value={value}
        list={list}
        onChange={onChange}
      />
      {list && (
        <datalist id={list}>
          {options.map((option) => (
            <option
              value={option.code}
              placeholder={option.name}
              key={option.code}
            >
              {option.name} ({option.city}, {option.country})
            </option>
          ))}
        </datalist>
      )}
    </div>
  );
};
