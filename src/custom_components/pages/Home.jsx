import React from "react";
import { FlightSearchPanel } from "../organisms/FlightSearchPanel/FlightSearchPanel";
import { Recommendations } from "../organisms/Recommendations/Recommendations.jsx";
import { PageTemplate } from "@/custom_components/templates/PageTemplate/PageTempate.jsx";

export const Home = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <PageTemplate>
          <FlightSearchPanel />
        </PageTemplate>
        <Recommendations />
      </div>
    </>
  );
};
