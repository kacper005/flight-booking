import React from "react";
import { useLocation } from "react-router-dom";
import { PageTemplate } from "@templates/PageTemplate/PageTempate";
import { Button } from "@atoms/Button";
import "./SearchResultDetails.css";
import { calculateDurationHoursAndMinutes } from "@formatters/DateFormatters";

export const SearchResultDetails = () => {
  const { state } = useLocation();

  console.log("State from SearchResultDetails:", state);

  const {
    outbandFlightOriginAirportCode,
    outbandFlightOriginAirportName,
    outbandFlightOriginAirportCity,
    outbandFlightDestinationAirportCode,
    outbandFlightDestinationAirportName,
    outbandFlightDestinationAirportCity,
    returnFlightOriginAirportCode,
    returnFlightOriginAirportName,
    returnFlightOriginAirportCity,
    returnFlightDestinationAirportCode,
    returnFlightDestinationAirportName,
    returnFlightDestinationAirportCity,
    outboundOperatingAirlineName,
    returnOperatingAirlineName,
    outboundOperatingAirlineLogo,
    returnOperatingAirlineLogo,
    outbandFlightDepartureDate,
    returnFlightDepartureDate,
    outbandFlightDepartureTime,
    outbandFlightArrivalTime,
    returnFlightDepartureTime,
    returnFlightArrivalTime,
    extraFeatures,
    availableClasses,
    roundTrip,
    flightPrices,
    currency,
    totalPassengers,
  } = state;

  return (
    <PageTemplate>
      <div className="flight-details">
        <div className="flight-card-section">
          <div style={{ marginBottom: "15px" }}>
            <h4>
              {outbandFlightOriginAirportCity} to{" "}
              {outbandFlightDestinationAirportCity}
            </h4>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              {roundTrip ? <p>Round Trip</p> : <p>One Way</p>}
              <p>, {totalPassengers} Travellers</p>
            </div>
          </div>

          <div className="flight-card">
            <div className="flight-info">
              <img
                src={`/airline_logos/${outboundOperatingAirlineLogo}.png`}
                alt={outboundOperatingAirlineName}
              />

              <p>
                {outbandFlightOriginAirportName} (
                {outbandFlightOriginAirportCode}) →{" "}
                {outbandFlightDestinationAirportName} (
                {outbandFlightDestinationAirportCode})
              </p>
              <p>
                {outbandFlightDepartureDate} | {outbandFlightDepartureTime} →{" "}
                {outbandFlightArrivalTime}{" "}
                {`(${calculateDurationHoursAndMinutes(
                  outbandFlightDepartureTime,
                  outbandFlightArrivalTime
                )})`}
              </p>
              <p>{outboundOperatingAirlineName}</p>
            </div>
          </div>

          {roundTrip && (
            <div className="flight-card">
              <div className="flight-info">
                <img
                  src={`/airline_logos/${returnOperatingAirlineLogo}.png`}
                  alt={returnOperatingAirlineName}
                />

                <p>
                  {returnFlightOriginAirportName} (
                  {returnFlightOriginAirportCode}) →{" "}
                  {returnFlightDestinationAirportName} (
                  {returnFlightDestinationAirportCode})
                </p>
                <p>
                  {returnFlightDepartureDate} | {returnFlightDepartureTime} →{" "}
                  {returnFlightArrivalTime}{" "}
                  {`(${calculateDurationHoursAndMinutes(
                    returnFlightDepartureTime,
                    returnFlightArrivalTime
                  )})`}
                </p>
                <p>{returnOperatingAirlineName}</p>
              </div>
            </div>
          )}
        </div>

        <div className="details-section">
          {/* <h3>Available Classes</h3>
          <ul>{availableClasses}</ul>

          <h3>Extra Features</h3>
          <ul>{extraFeatures}</ul> */}

          {flightPrices.map((flightPrice, index) => (
            <div key={index} className="flight-price-card">
              <p>{flightPrice.priceProviderName}</p>
              <p>
                {flightPrice.price} {currency}
              </p>
              <Button bgColor={"var(--green)"}>Book</Button>
            </div>
          ))}
        </div>
      </div>
    </PageTemplate>
  );
};
