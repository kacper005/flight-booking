import React from "react";
import { Info } from "lucide-react";
import "./Tooltip.css";

export const Tooltip = ({ content }) => {
  return (
    <div className="tooltip-container">
      <Info className="info-icon" />
      <span className="tooltip-text">{content}</span>
    </div>
  );
};
