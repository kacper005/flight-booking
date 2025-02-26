import React from "react";
import RecommendationCard from "@/custom_components/atoms/RecommendationCard/RecommendationCard.jsx";

export const Recommendations = () => {
  return (
    <section
      style={{
        backgroundColor: "var(--textColor)",
        width: "100vw",
        margin: "20% 0 0 0",
        display: "flex",
        justifyContent: "start",
        flexWrap: "wrap",
        paddingTop: "10px",
        paddingBottom: "20px",
      }}
    >
      <h1
        style={{
          left: "20px",
          padding: "20px 10%",
        }}
      >
        Recommendations
      </h1>
      <div
        style={{
          padding: "20px 9.8%",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          width: "100%",
          flexGrow: 2,
          paddingTop: "0",
        }}
      >
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
