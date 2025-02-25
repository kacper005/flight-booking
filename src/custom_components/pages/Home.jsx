import React from "react";
import { SearchPanel } from "../organisms/SearchPanel";
import { Recommendations } from "../organisms/Recommendations";
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
          <SearchPanel />
        </PageTemplate>
        <Recommendations />
      </div>
    </>
  );
};
