import React from "react";
import { useLocation } from "react-router-dom";
import { PageTemplate } from "@templates/PageTemplate/PageTempate";

export const SearchResultDetails = () => {
  const { state } = useLocation();

  return (
    <PageTemplate>
      <h1>Flight Details</h1>
      <p>
        {state.outbandFlightOriginAirportCode} to{" "}
        {state.outbandFlightDestinationAirportCode}
      </p>
    </PageTemplate>
  );
};
