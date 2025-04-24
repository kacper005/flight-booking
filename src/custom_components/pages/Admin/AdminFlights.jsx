import React from "react";
import "./AdminFlights.css";
import { ButtonSmall } from "../../atoms/ButtonSmall";
import { useFetch } from "@hooks/useFetch.js";

export const AdminFlights = () => {
  const apiUrl = import.meta.env.VITE_FLIGHT_FINDER_API_URL;

  const {
    data: flights,
    loading: loadingFlights,
    error: flightsError,
  } = useFetch(`${apiUrl}/flights`);

  return (
    <body>
      <h1>Edit Flights</h1>
      <br />
      <div>
        {loadingFlights && <h3>Loading Flights...</h3>}
        {flightsError && (
          <h3>
            {flightsError.message ||
              "An error occurred while fetching flights."}
          </h3>
        )}
        {flights?.length === 0 && <h3>No flights found</h3>}
      </div>

      {flights?.map((flight, index) => {
        {
          /* Retrieve data from the DB and show them on the site */
        }
        return (
          <p key={index}>
            <strong>Flight ID:</strong> {flight.flightId}
            <br />
            <strong>Departure Airport:</strong> {flight.departureAirport.code}
            <br />
            <strong>Arrival Airport:</strong> {flight.arrivalAirport.code}
            <br />
            <strong>Round Trip:</strong> {flight.roundTrip ? "Yes" : "No"}
            <br />
            <strong>Status:</strong> {flight.status}
            <br />
            <strong>Departure Time:</strong> {flight.departureTime}
            <br />
            <strong>Arrival Time:</strong> {flight.arrivalTime}
            <br />
            <strong>Price:</strong> {flight.prices?.[0]?.price || ""}
            <br />
            <strong>Currency:</strong> {flight.prices?.[0]?.currency || ""}
            <br />
            <strong>Airline:</strong> {flight.airline.name}
            <br />
            <strong>Flight Number:</strong> {flight.flightNumber}
            <br />
            <strong>Available Classes:</strong> {flight.availableClasses}
            <br />
            <ButtonSmall>Edit</ButtonSmall>
          </p>
        );
      })}
    </body>
  );
};
