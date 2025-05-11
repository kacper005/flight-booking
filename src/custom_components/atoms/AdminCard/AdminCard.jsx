import React from "react";
import { FileQuestion } from "lucide-react";
import "./AdminCard.css";

export default function AdminCard({
  icon: Icon = FileQuestion,
  title = "Admin Card",
}) {
  return (
    <div className={"adminCard"}>
      <div className={"iconContainer"}>
        <Icon className={"adminCard-icon"} size={100} strokeWidth={1} />
      </div>
      <h2>{title}</h2>
    </div>
  );
}
