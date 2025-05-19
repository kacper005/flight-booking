import React from "react";
import { FlightSearchPanel } from "@organisms/FlightSearchPanel/FlightSearchPanel.jsx";
import { Recommendations } from "@organisms/Recommendations/Recommendations.jsx";
import { PageTemplate } from "@templates/PageTemplate/PageTempate.jsx";
import { Feedback } from "@organisms/Feedback/Feedback.jsx";
import "./Home.css";

export const Home = () => {
  return (
    <div className={"homeContainer"}>
      <PageTemplate>
        <FlightSearchPanel />
      </PageTemplate>
      <Recommendations />
      <Feedback />
    </div>
  );
};
