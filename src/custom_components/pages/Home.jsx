import React from "react";
import { FlightSearchPanel } from "../organisms/FlightSearchPanel/FlightSearchPanel";
import { Recommendations } from "../organisms/Recommendations/Recommendations.jsx";
import { PageTemplate } from "@/custom_components/templates/PageTemplate/PageTempate.jsx";
import planeBg from "../../assets/plane_bg.svg";

export const Home = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url(${planeBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center 10%",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <PageTemplate>
        <FlightSearchPanel />
      </PageTemplate>
      <Recommendations />
    </div>
  );
};
