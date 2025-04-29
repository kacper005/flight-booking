import React from "react";
import "./AdminFlights.css";
import { ButtonSmall } from "../../atoms/ButtonSmall";
import { getFlights, updateFlight } from "@api/flightApi.js";
import { AdminFlightsModal } from "@organisms/AdminFlightsModal/AdminFlightsModal.jsx";

export const AdminFlights = () => {
  const [flights, setFlights] = React.useState([]);
  const [loadingFlights, setLoading] = React.useState(true);
  const [flightsError, setError] = React.useState(null);
  const [selectedFlight, setSelectedFlight] = React.useState(null);

  React.useEffect(() => {
    const fetchFlights = async () => {
      try {
        const res = await getFlights();
        setFlights(res.data);
      } catch (err) {
        setError(err.message || "Failed to load flights.");
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
  }, []);

  const formatDateTime = (isoString) => {
    const date = new Date(isoString);
    return new Intl.DateTimeFormat("en-GB", {
      dateStyle: "short",
      timeStyle: "short",
    }).format(date);
  };

  const handleSave = async (updatedFlight) => {
    try {
      await updateFlight(updatedFlight.flightId, updatedFlight);
      setFlights((prev) =>
        prev.map((f) =>
          f.flightId === updatedFlight.flightId ? updatedFlight : f,
        ),
      );
      setSelectedFlight(null);
      window.location.reload();
    } catch (error) {
      console.error("Error updating flight:", error);
      setError("Failed to update flight.");
    }
  };

  return (
    <div className={"adminClassContainer"}>
      <h1>Edit Flights</h1>
      {loadingFlights && <h3>Loading Flights...</h3>}
      {flightsError && <h3>{flightsError}</h3>}
      {!loadingFlights && flights.length === 0 && <h3>No flights found</h3>}

      {!loadingFlights && flights.length > 0 && (
        <table className={"flightsTable"}>
          <thead>
            <tr>
              <th className={"colFlightNumber"}>Flight Number</th>
              <th className={"colDeparture"}>Departure Airport</th>
              <th className={"colArrival"}>Arrival Airport</th>
              <th className={"colRoundTrip"}>Round Trip</th>
              <th className={"colStatus"}>Status</th>
              <th className={"colDepartureTime"}>Departure Time</th>
              <th className={"colArrivalTime"}>Arrival Time</th>
              <th className={"colClasses"}>Available Classes</th>
              <th className={"colEdit"}></th>
            </tr>
          </thead>
          <tbody>
            {flights.map((flight, index) => (
              <tr
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedFlight(flight);
                }}
              >
                <td className={"colFlightNumber"}>{flight.flightNumber}</td>
                <td className={"colDeparture"}>
                  {flight.departureAirport.code}
                </td>
                <td className={"colArrival"}>{flight.arrivalAirport.code}</td>
                <td className={"colRoundTrip"}>
                  {flight.roundTrip ? "True" : "False"}
                </td>
                <td className={"colStatus"}>{flight.status}</td>
                <td className={"colDepartureTime"}>
                  {formatDateTime(flight.departureTime)}
                </td>
                <td className={"colArrivalTime"}>
                  {formatDateTime(flight.arrivalTime)}
                </td>
                <td className={"colClasses"}>{flight.availableClasses}</td>
                <td className={"colEdit"}>
                  <ButtonSmall
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedFlight(flight);
                    }}
                  >
                    Edit
                  </ButtonSmall>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {selectedFlight && (
        <AdminFlightsModal
          flight={selectedFlight}
          onClose={() => setSelectedFlight(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};
