import React from "react";
import {
  calculateDurationHoursAndMinutesFromIso,
  formatDate3elements,
  formatTime2Digit,
} from "@formatters/DateFormatters";
import "./SearchResultDetails.css";

export const FlightCard = ({ flight }) => {
  return (
    <div className="flight-card">
      <div className="flight-info">
        <div className="flight-info-header">
          <img
            src={`/airline_logos/${flight.airline.logoFileName}.png`}
            alt={flight.airline.name}
          />
          <div className="flight-info-details">
            <b>
              {flight.departureAirport.code} → {flight.arrivalAirport.code}{" "}
              {formatDate3elements(flight.departureTime)}
            </b>
            <p style={{ fontSize: "1.4rem" }}>
              Direct •{" "}
              {calculateDurationHoursAndMinutesFromIso(
                flight.departureTime,
                flight.arrivalTime
              )}
            </p>
          </div>
        </div>

        <div style={{ padding: "10px" }}>
          <b>
            {formatTime2Digit(flight.departureTime)} →{" "}
            {formatTime2Digit(flight.arrivalTime)} (
            {calculateDurationHoursAndMinutesFromIso(
              flight.departureTime,
              flight.arrivalTime
            )}
            )
          </b>
          <p style={{ fontSize: "1.4rem" }}>
            {flight.departureAirport.name} ({flight.departureAirport.code}) -{" "}
            {flight.arrivalAirport.name} ({flight.arrivalAirport.code})
          </p>
          <p style={{ fontSize: "1.4rem" }}>{flight.airline.name}</p>
        </div>
      </div>
    </div>
  );
};
