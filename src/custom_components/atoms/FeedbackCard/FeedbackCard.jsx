import PropTypes from "prop-types";
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
      <p>Rating: {rating}</p>
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
