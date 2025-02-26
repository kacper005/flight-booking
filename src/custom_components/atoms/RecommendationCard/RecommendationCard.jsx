import PropTypes from "prop-types";
import "./RecommendationCard.css";

export default function RecommendationCard({
  imageSrcSet = "https://picsum.photos/270/160?=rnd1",
  title = "Recommendation",
  info = "Recommendation description text.",
}) {
  return (
    <div className="recommendationCard">
      <img src={imageSrcSet} alt={title} />
      <h2>{title}</h2>
      <p>{info}</p>
    </div>
  );
}

RecommendationCard.propTypes = {
  imageSrcSet: PropTypes.string,
  title: PropTypes.string,
  info: PropTypes.string,
};
