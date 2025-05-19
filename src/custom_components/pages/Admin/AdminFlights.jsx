import React from "react";
import { TableProperties, TableOfContents } from "lucide-react";
import { SquarePen } from "lucide-react";
import { getFlights, updateFlight } from "@api/flightApi.js";
import { formatDateTime } from "@formatters/DateFormatters";
import { formatDate2Digit, formatTime2Digit } from "@formatters/DateFormatters";
import { Button } from "@atoms/Button.jsx";
import { ButtonSmall } from "@atoms/ButtonSmall.jsx";
import { getFlightStatus } from "@enums/FlightStatus";
import { LoadingSpinner } from "@atoms/LoadingSpinner";
import { AdminFlightsModal } from "@organisms/AdminFlightsModal/AdminFlightsModal.jsx";
import { AdminNewFlightModal } from "@organisms/AdminFlightsModal/AdminNewFlightModal.jsx";
import { SearchResultCard } from "@organisms/SearchResultCard/SearchResultCard";
import "./AdminFlights.css";

export const AdminFlights = () => {
  const [flights, setFlights] = React.useState([]);
  const [loadingFlights, setLoading] = React.useState(true);
  const [flightsError, setError] = React.useState(null);
  const [selectedFlight, setSelectedFlight] = React.useState(null);
  const [showAddFlightModal, setShowAddFlightModal] = React.useState(false);
  const [showCardView, setShowCardView] = React.useState(false);

  const getFlightsTable = async () => {
    const res = await getFlights();
    setFlights(res.data);
  };

  React.useEffect(() => {
    const fetchFlights = async () => {
      try {
        await getFlightsTable();
      } catch (err) {
        setError(err.message || "Failed to load flights.");
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
  }, []);

  const handleSave = async (updatedFlight) => {
    try {
      await updateFlight(updatedFlight.flightId, updatedFlight);
      await getFlightsTable();
      setSelectedFlight(null);
    } catch (error) {
      console.error("Error updating flight:", error);
    }
  };

  const handleClose = async () => {
    try {
      await getFlightsTable();
      setSelectedFlight(null);
    } catch (error) {
      console.error("Error updating flight:", error);
    }
  };

  const handleAddFlight = async () => {
    try {
      toggleModal();
      await getFlightsTable();
    } catch (error) {
      console.error("Error adding flight:", error);
    }
  };

  const toggleModal = () => {
    setShowAddFlightModal(!showAddFlightModal);
  };

  // Prevent scrolling behind modal when modal is open
  if (selectedFlight || showAddFlightModal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  return (
    <div className={"adminClassContainer"}>
      <h1>Edit Flights</h1>

      <div className="admin-toolbar">
        <Button onClick={toggleModal}>Add Flight</Button>

        <button
          onClick={() => setShowCardView(false)}
          className={`admin-icon-button ${!showCardView ? "active" : ""}`}
          title="Switch to Table View"
        >
          <TableProperties size={26} />
        </button>

        <button
          onClick={() => setShowCardView(true)}
          className={`admin-icon-button ${showCardView ? "active" : ""}`}
          title="Switch to Card View"
        >
          <TableOfContents size={26} />
        </button>
      </div>

      {loadingFlights && <LoadingSpinner />}
      {flightsError && <h3>{flightsError}</h3>}
      {!loadingFlights && flights.length === 0 && <h3>No flights found</h3>}

      {!loadingFlights &&
        flights.length > 0 &&
        (showCardView ? (
          <div className="cardViewContainer">
            {flights.map((flight, index) => {
              const outbound = flight;
              const ret = flight.returnFlight || null;

              const prices = flight.prices || [];
              const lowestOutboundPrice = prices[0]?.amount || 0;
              const totalPrice = lowestOutboundPrice;
              const adult = 1,
                child = 0,
                infant = 0;

              return (
                <SearchResultCard
                  key={index}
                  outboundFlightOriginAirportCode={
                    ret?.arrivalAirport?.code ||
                    outbound?.departureAirport?.code
                  }
                  outboundFlightDestinationAirportCode={
                    ret?.departureAirport?.code ||
                    outbound?.arrivalAirport?.code
                  }
                  returnFlightOriginAirportCode={outbound?.arrivalAirport?.code}
                  returnFlightDestinationAirportCode={
                    outbound?.departureAirport?.code
                  }
                  outboundOperatingAirlineName={outbound?.airline?.name}
                  returnOperatingAirlineName={ret?.airline?.name || ""}
                  outboundOperatingAirlineLogo={outbound?.airline?.logoFileName}
                  returnOperatingAirlineLogo={ret?.airline?.logoFileName || ""}
                  outboundFlightDepartureDate={formatDate2Digit(
                    outbound?.departureTime,
                  )}
                  returnFlightDepartureDate={
                    ret ? formatDate2Digit(ret?.departureTime) : ""
                  }
                  outboundFlightDepartureTime={formatTime2Digit(
                    outbound?.departureTime,
                  )}
                  outboundFlightArrivalTime={formatTime2Digit(
                    outbound?.arrivalTime,
                  )}
                  returnFlightDepartureTime={
                    ret ? formatTime2Digit(ret?.departureTime) : ""
                  }
                  returnFlightArrivalTime={
                    ret ? formatTime2Digit(ret?.arrivalTime) : ""
                  }
                  availableClasses={outbound?.availableClasses}
                  roundTrip={!!ret}
                  price={lowestOutboundPrice}
                  currency={prices[0]?.currency || ""}
                  totalPrice={totalPrice}
                  numAdults={adult}
                  numChildren={child}
                  numInfants={infant}
                  totalPassengers={adult + child + infant}
                  outboundFlightId={outbound?.flightId}
                  returnFlightId={ret?.flightId}
                  adminView={true}
                  onClick={() => setSelectedFlight(flight)}
                />
              );
            })}
          </div>
        ) : (
          <table className={"adminTable"}>
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
                  <td className={"colStatus"}>
                    {getFlightStatus(flight.status)}
                  </td>
                  <td className={"colDepartureTime"}>
                    {formatDateTime(flight.departureTime)}
                  </td>
                  <td className={"colArrivalTime"}>
                    {formatDateTime(flight.arrivalTime)}
                  </td>
                  <td className={"colClasses"}>{flight.availableClasses}</td>
                  <td className={"colEdit"}>
                    <SquarePen
                      className="editIcon"
                      size={26}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedFlight(flight);
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ))}

      {selectedFlight && (
        <AdminFlightsModal
          flight={selectedFlight}
          onClose={handleClose}
          onSave={handleSave}
        />
      )}
      {showAddFlightModal && (
        <AdminNewFlightModal
          addNewFlight={toggleModal}
          onClose={toggleModal}
          onSave={handleAddFlight}
        />
      )}
    </div>
  );
};
