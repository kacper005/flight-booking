import React from "react";
import { useLocation } from "react-router-dom";
import { PageTemplate } from "@templates/PageTemplate/PageTempate";
import { Button } from "@atoms/Button";
import "./SearchResultDetails.css";
import {
  calculateDurationHoursAndMinutes,
  formatDate3elements,
} from "@formatters/DateFormatters";
import { ButtonSmall } from "@atoms/ButtonSmall";

export const SearchResultDetails = () => {
  const { state } = useLocation();

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
        <div className="details-section">
          {flightPrices.map((flightPrice, index) => (
            <div key={index} className="flight-price-card">
              <b style={{ fontSize: "1.5rem" }}>
                {flightPrice.priceProviderName}
              </b>
              <b style={{ fontSize: "1.6rem" }}>
                {flightPrice.price} {currency}
              </b>
              <ButtonSmall
                bgColor={"var(--green)"}
                hoverBgColor={"var(--greenLight)"}
              >
                Save Trip
              </ButtonSmall>
            </div>
          ))}
        </div>
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
              <div className="flight-info-header">
                <img
                  src={`/airline_logos/${outboundOperatingAirlineLogo}.png`}
                  alt={outboundOperatingAirlineName}
                />
                <div className="flight-info-details">
                  <b>
                    {outbandFlightOriginAirportCode} →{" "}
                    {outbandFlightDestinationAirportCode}{" "}
                    {formatDate3elements(outbandFlightDepartureDate)}
                  </b>
                  <p>{`Direct • ${calculateDurationHoursAndMinutes(
                    outbandFlightDepartureTime,
                    outbandFlightArrivalTime
                  )}`}</p>
                </div>
              </div>

              <div style={{ padding: "10px" }}>
                <b>
                  {outbandFlightDepartureTime} → {outbandFlightArrivalTime}{" "}
                  {`(${calculateDurationHoursAndMinutes(
                    outbandFlightDepartureTime,
                    outbandFlightArrivalTime
                  )})`}
                </b>

                <p>
                  {outbandFlightOriginAirportName}{" "}
                  {`(${outbandFlightOriginAirportCode})`} -{" "}
                  {outbandFlightDestinationAirportName}{" "}
                  {`(${outbandFlightDestinationAirportCode})`}
                </p>
                <p>{outboundOperatingAirlineName}</p>
              </div>
            </div>
          </div>

          {roundTrip && (
            <div className="flight-card">
              <div className="flight-info">
                <div className="flight-info-header">
                  <img
                    src={`/airline_logos/${returnOperatingAirlineLogo}.png`}
                    alt={returnOperatingAirlineName}
                  />
                  <div className="flight-info-details">
                    <b>
                      {returnFlightOriginAirportCode} →{" "}
                      {returnFlightDestinationAirportCode}{" "}
                      {formatDate3elements(returnFlightDepartureDate)}
                    </b>
                    <p>{`Direct • ${calculateDurationHoursAndMinutes(
                      returnFlightDepartureTime,
                      returnFlightArrivalTime
                    )}`}</p>
                  </div>
                </div>

                <div style={{ padding: "10px" }}>
                  <b>
                    {returnFlightDepartureTime} → {returnFlightArrivalTime}{" "}
                    {`(${calculateDurationHoursAndMinutes(
                      returnFlightDepartureTime,
                      returnFlightArrivalTime
                    )})`}
                  </b>
                  <p>
                    {returnFlightOriginAirportName}{" "}
                    {`(${returnFlightOriginAirportCode})`} -{" "}
                    {returnFlightDestinationAirportName}{" "}
                    {`(${returnFlightDestinationAirportCode})`}
                  </p>
                  <p>{returnOperatingAirlineName}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </PageTemplate>
  );
};
