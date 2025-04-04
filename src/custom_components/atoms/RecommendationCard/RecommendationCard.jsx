import "./RecommendationCard.css";

export default function RecommendationCard({
  imageSrcSet = "https://picsum.photos/270/160?=rnd1",
  title = "Recommendation",
  departurePoint = "Departure Point",
  price = "Price $",
  info = "Recommendation description text.",
}) {
  return (
    <div className="recommendationCard">
      <img src={imageSrcSet} alt={title} />
      <h2>{title}</h2>
      <p>From {departurePoint}</p>
      <p>{price}</p>
      <p id={"info"}>{info}</p>
    </div>
  );
}
