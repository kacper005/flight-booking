import React from "react";
import "./Feedback.css";
import FeedbackCard from "@/custom_components/atoms/FeedbackCard/FeedbackCard.jsx";

export const Feedback = () => {
  return (
    <section className={"feedback"}>
      <h1>Feedback</h1>
      <div className={"feedbackCardContainer"}>
        <FeedbackCard
          name="User 1"
          rating={5}
          feedback="Feedback text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elementum sollicitudin augue, sed volutpat felis commodo in."
          date="01.01.2025"
        />
        <FeedbackCard
          name="User 2"
          rating={4}
          feedback="Feedback text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elementum sollicitudin augue, sed volutpat felis commodo in."
          date="02.02.2025"
        />
      </div>
    </section>
  );
};
