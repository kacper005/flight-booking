import PropTypes from "prop-types";
import "./FeedbackCard.css";
import { Star } from "lucide-react";

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
            fill={"#ffd250"}
            stroke={"#141619"}
            strokeWidth={1}
          />
        ))}
      </div>

      <p>{feedback}</p>
      <p id={"date"}>{date}</p>
    </div>
  );
}

FeedbackCard.propTypes = {
  name: PropTypes.string,
  rating: PropTypes.number,
  feedback: PropTypes.string,
  date: PropTypes.string,
};
