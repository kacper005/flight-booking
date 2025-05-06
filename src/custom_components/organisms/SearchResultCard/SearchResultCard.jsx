import React from "react";
import { Button } from "@atoms/Button";
import { useNavigate } from "react-router-dom";
import "./SearchResultCard.css";

export const SearchResultCard = ({
  outbandFlightOriginAirportCode,
  outbandFlightDestinationAirportCode,
  returnFlightOriginAirportCode,
  returnFlightDestinationAirportCode,
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
  price,
  currency,
  totalPrice,
}) => {
  const calculateFlightDuration = (departure, arrival) => {
    const [depHour, depMin] = departure.split(":").map(Number);
    const [arrHour, arrMin] = arrival.split(":").map(Number);

    const depDate = new Date(0, 0, 0, depHour, depMin);
    const arrDate = new Date(0, 0, 0, arrHour, arrMin);

    if (arrDate < depDate) arrDate.setDate(arrDate.getDate() + 1);

    const diffMs = arrDate - depDate;
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    return `${hours}h ${minutes}m`;
  };

  const navigate = useNavigate();

  const handleSelect = () => {
    navigate("/search-results-details", {
      state: {
        outbandFlightOriginAirportCode,
        outbandFlightDestinationAirportCode,
        returnFlightOriginAirportCode,
        returnFlightDestinationAirportCode,
        outbandFlightDepartureDate,
        returnFlightDepartureDate,
        outbandFlightDepartureTime,
        outbandFlightArrivalTime,
        returnFlightDepartureTime,
        returnFlightArrivalTime,
        outboundOperatingAirlineName,
        returnOperatingAirlineName,
        price,
        totalPrice,
        currency,
        availableClasses,
        extraFeatures,
        roundTrip,
      },
    });
  };

  return (
    <div className="search-result-container">
      {/* Flight Info */}
      <div
        style={{
          flex: 3,
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        {/* Outbound Flight */}
        <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
          <img
            src={`/airline_logos/${outboundOperatingAirlineLogo}.png`}
            style={{ width: "40px", height: "34px" }}
            alt="Airline Logo"
          />
          <div style={{ flexGrow: 1 }}>
            <p style={{ margin: 0 }}>
              <b>Departure:</b> {outbandFlightDepartureDate}
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginTop: 6,
              }}
            >
              <div style={{ textAlign: "center" }}>
                <h4 style={{ margin: 0 }}>{outbandFlightDepartureTime}</h4>
                <p style={{ margin: 0 }}>{outbandFlightOriginAirportCode}</p>
              </div>
              <div style={{ textAlign: "center", flex: 1 }}>
                <p style={{ fontSize: "12px", marginBottom: "4px" }}>
                  {calculateFlightDuration(
                    outbandFlightDepartureTime,
                    outbandFlightArrivalTime
                  )}
                </p>
                <hr style={{ width: "100%", border: "1px solid #ccc" }} />
              </div>
              <div style={{ textAlign: "center" }}>
                <h4 style={{ margin: 0 }}>{outbandFlightArrivalTime}</h4>
                <p style={{ margin: 0 }}>
                  {outbandFlightDestinationAirportCode}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Return Flight */}
        {roundTrip && (
          <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
            <img
              src={`/airline_logos/${returnOperatingAirlineLogo}.png`}
              style={{ width: "40px", height: "34px" }}
              alt="Return Airline Logo"
            />
            <div style={{ flexGrow: 1 }}>
              <p style={{ margin: 0 }}>
                <b>Return:</b> {returnFlightDepartureDate}
              </p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: 6,
                }}
              >
                <div style={{ textAlign: "center" }}>
                  <h4 style={{ margin: 0 }}>{returnFlightDepartureTime}</h4>
                  <p style={{ margin: 0 }}>{returnFlightOriginAirportCode}</p>
                </div>
                <div style={{ textAlign: "center", flex: 1 }}>
                  <p style={{ fontSize: "12px", marginBottom: "4px" }}>
                    {calculateFlightDuration(
                      returnFlightDepartureTime,
                      returnFlightArrivalTime
                    )}
                  </p>
                  <hr style={{ width: "100%", border: "1px solid #ccc" }} />
                </div>
                <div style={{ textAlign: "center" }}>
                  <h4 style={{ margin: 0 }}>{returnFlightArrivalTime}</h4>
                  <p style={{ margin: 0 }}>
                    {returnFlightDestinationAirportCode}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        <p style={{ fontSize: "14px", color: "#555", marginTop: "8px" }}>
          {returnOperatingAirlineName
            ? outboundOperatingAirlineName === returnOperatingAirlineName
              ? outboundOperatingAirlineName
              : `${outboundOperatingAirlineName} & ${returnOperatingAirlineName}`
            : outboundOperatingAirlineName}
        </p>
      </div>

      {/* Price & Booking Info */}
      <div className="price-info">
        {price === totalPrice && (
          <p style={{ fontWeight: "bold", fontSize: "2rem", margin: 0 }}>
            {price} {currency}
            <span style={{ fontWeight: "normal", fontSize: "2rem" }}></span>
          </p>
        )}

        {price !== totalPrice && (
          <>
            <p style={{ fontWeight: "bold", fontSize: "2rem", margin: 0 }}>
              {price} {currency}
              <span style={{ fontWeight: "normal", fontSize: "1.2rem" }}>
                {" "}
                / person
              </span>
            </p>
            <b style={{ fontSize: "1.2rem", lineHeight: "1.8rem" }}>
              Total price: {totalPrice} {currency}
            </b>
          </>
        )}

        <div>
          <p style={{ fontSize: "1.1rem", lineHeight: "1.8rem" }}>
            {availableClasses}
          </p>
        </div>
        <div
          style={{ width: "100%", marginTop: "auto" }}
          className="button-container"
        >
          <Button width={"100%"} onClick={handleSelect}>
            Select
          </Button>
        </div>
      </div>
    </div>
  );
};
