import React from "react";
import { ChevronDown } from "lucide-react";
import "./Accordion.css";

const Accordion = ({ header, content, actions }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="accordion">
      <div className="accordion-header" onClick={() => setIsOpen(!isOpen)}>
        {header}
        <div className="accordion-actions">
          <div onClick={(e) => e.stopPropagation()}>{actions}</div>
          <ChevronDown className={`icon ${isOpen ? "open" : ""}`} />
        </div>
      </div>
      <div className={`accordion-content ${isOpen ? "show" : ""}`}>
        {content}
      </div>
    </div>
  );
};

export const PriceDetailsAccordion = ({ items }) => {
  return (
    <div className="accordion-container">
      {items.map((item, index) => (
        <Accordion
          key={index}
          header={item.title}
          content={item.content}
          actions={item.actions}
        />
      ))}
    </div>
  );
};
