import PropTypes from "prop-types";

function RecommendationCard(props) {
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
        src={props.imageSrcSet}
      />
      <h2 style={{ padding: "2px 10px" }}>{props.title}</h2>
      <p
        style={{
          width: "98%",
          padding: "5px 10px",
        }}
      >
        {props.info}
      </p>
    </div>
  );
}

// Default props: values that are applied to a prop if not passed into the component.
RecommendationCard.defaultProps = {
  imageSrcSet: "https://picsum.photos/seed/picsum/400/300",
  title: "Recommendation",
  info: "Recommendation description text.",
};

// PropTypes: mechanism to validate correct data types are passed into props.
// Used for debugging in the browser console.
RecommendationCard.propType = {
  imageSrcSet: PropTypes.string,
  title: PropTypes.string,
  info: PropTypes.string,
};

export default RecommendationCard;
