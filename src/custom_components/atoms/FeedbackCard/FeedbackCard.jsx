import React from "react";
import { Star } from "lucide-react";
import "./FeedbackCard.css";

export default function FeedbackCard({
  name = "User",
  rating = 5,
  feedback = "Feedback text.",
  date = "01.01.2025",
}) {
  return (
    <div className="feedbackCard">
      <h2>{name}</h2>

      <div className={"stars"}>
        {[...Array(rating)].map((_, index) => (
          <Star
            key={index}
            size={25}
            fill={"var(--yellow)"}
            stroke={"var(--textColorDark)"}
            strokeWidth={1}
          />
        ))}
      </div>

      <p>{feedback}</p>
      <p id={"date"}>{date}</p>
    </div>
  );
}
