import PropTypes from "prop-types";

export default function RecommendationCard({
  imageSrcSet = "https://picsum.photos/seed/picsum/400/300",
  title = "Recommendation",
  info = "Recommendation description text.",
}) {
  return (
    <div
      style={{
        display: "block",
        margin: "10px 5px",
        height: "400px",
        width: "270px",
        boxShadow: "lightgrey 5px 5px 10px",
        backgroundColor: "white",
        borderRadius: "10px",
      }}
    >
      <img
        style={{
          width: "270px",
          height: "160px",
          borderRadius: "8px 8px 0 0",
        }}
        src={imageSrcSet}
        alt={title}
      />
      <h2 style={{ padding: "2px 10px" }}>{title}</h2>
      <p
        style={{
          width: "98%",
          padding: "5px 10px",
        }}
      >
        {info}
      </p>
    </div>
  );
}

RecommendationCard.propTypes = {
  imageSrcSet: PropTypes.string,
  title: PropTypes.string,
  info: PropTypes.string,
};
