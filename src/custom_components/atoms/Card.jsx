import React from "react";

export const Card = ({ children, width, height, color, display,alighItems, justifyContent }) => {
  return (
    <div style={{ 
      width: width, 
      height: height, 
      backgroundColor: color, 
      padding: "20px", 
      borderRadius: "10px", 
      display: display, 
      alignItems: alighItems, 
      justifyContent: justifyContent 
      }}>
      {children}
    </div>
  );
};