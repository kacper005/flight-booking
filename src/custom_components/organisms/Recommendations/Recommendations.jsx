import React from "react";
import RecommendationCard from "@/custom_components/atoms/RecommendationCard/RecommendationCard.jsx";
import "./Recommendations.css";

export const Recommendations = () => {
  return (
    <section className={"recommendations"}>
      <h1>Recommendations</h1>
      <div className={"recommendationCardContainer"}>
        <RecommendationCard
          imageSrcSet="https://picsum.photos/270/160?=rnd1"
          title="Recommendation 1"
          info="Recommendation 1 Description text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elementum sollicitudin augue, sed volutpat felis commodo in."
        />
        <RecommendationCard
          imageSrcSet="https://picsum.photos/270/160?=rnd2"
          title="Recommendation 2"
          info="Recommendation 2 Description text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elementum sollicitudin augue, sed volutpat felis commodo in."
        />
        <RecommendationCard
          imageSrcSet="https://picsum.photos/270/160?=rnd3"
          title="Recommendation 3"
          info="Recommendation 3 Description text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elementum sollicitudin augue, sed volutpat felis commodo in."
        />
        <RecommendationCard
          imageSrcSet="https://picsum.photos/270/160?=rnd4"
          title={"Recommendation 4"}
          info="Recommendation 4 Description text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elementum sollicitudin augue, sed volutpat felis commodo in."
        />
      </div>
    </section>
  );
};
