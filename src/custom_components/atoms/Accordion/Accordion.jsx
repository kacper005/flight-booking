import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import "./Accordion.css";

const Accordion = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="accordion">
      <div className="accordion-header" onClick={() => setIsOpen(!isOpen)}>
        <h3>{title}</h3>
        <ChevronDown className={`icon ${isOpen ? "open" : ""}`} />
      </div>
      <div className={`accordion-content ${isOpen ? "show" : ""}`}>
        <p>{content}</p>
      </div>
    </div>
  );
};

const AccordionList = ({ items }) => {
  return (
    <div className="accordion-container">
      {items.map((item, index) => (
        <Accordion key={index} title={item.title} content={item.content} />
      ))}
    </div>
  );
};

export default AccordionList;
