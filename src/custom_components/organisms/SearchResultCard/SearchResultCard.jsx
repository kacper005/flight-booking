import React from "react";
import { useNavigate } from "react-router-dom";
import { calculateDurationHoursAndMinutes } from "@formatters/DateFormatters";
import { Grid } from "@atoms/Grid";
import { Button } from "@atoms/Button";
import "./SearchResultCard.css";

export const SearchResultCard = ({
  outboundFlightOriginAirportCode,
  outboundFlightDestinationAirportCode,
  returnFlightOriginAirportCode,
  returnFlightDestinationAirportCode,
  outboundOperatingAirlineName,
  returnOperatingAirlineName,
  outboundOperatingAirlineLogo,
  returnOperatingAirlineLogo,
  outboundFlightDepartureDate,
  returnFlightDepartureDate,
  outboundFlightDepartureTime,
  outboundFlightArrivalTime,
  returnFlightDepartureTime,
  returnFlightArrivalTime,
  availableClasses,
  roundTrip,
  price,
  currency,
  totalPrice,
  numAdults,
  numChildren,
  numInfants,
  totalPassengers,
  outboundFlightId,
  returnFlightId,
  adminView,
  onClick,
}) => {
  const navigate = useNavigate();

  const handleSelect = () => {
    if (roundTrip) {
      navigate(
        `/search-results-details?outboundFlightId=${outboundFlightId}&returnFlightId=${returnFlightId}&numAdults=${numAdults}&numChildren=${numChildren}&numInfants=${numInfants}&totalPassengers=${totalPassengers}`
      );
    } else {
      navigate(
        `/search-results-details?outboundFlightId=${outboundFlightId}&numAdults=${numAdults}&numChildren=${numChildren}&numInfants=${numInfants}&totalPassengers=${totalPassengers}`
      );
    }
  };

  return (
    <div
      className="search-result-container"
      onClick={(e) => {
        e.stopPropagation();
        if (adminView && onClick) {
          onClick();
        } else {
          handleSelect();
        }
      }}
    >
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
        <Grid display={"flex"} alignItems={"center"} gap={"16px"}>
          <img
            src={`/airline_logos/${outboundOperatingAirlineLogo}.png`}
            style={{ width: "40px", height: "34px" }}
            alt="Airline Logo"
          />
          <div style={{ flexGrow: 1 }}>
            <p style={{ margin: 0 }}>
              <b>Departure:</b> {outboundFlightDepartureDate}
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
                <h4 style={{ margin: 0 }}>{outboundFlightDepartureTime}</h4>
                <p style={{ margin: 0 }}>{outboundFlightOriginAirportCode}</p>
              </div>
              <div style={{ textAlign: "center", flex: 1 }}>
                <p style={{ fontSize: "12px", marginBottom: "4px" }}>
                  {calculateDurationHoursAndMinutes(
                    outboundFlightDepartureTime,
                    outboundFlightArrivalTime
                  )}
                </p>
                <hr style={{ width: "100%", border: "1px solid #ccc" }} />
              </div>
              <div style={{ textAlign: "center" }}>
                <h4 style={{ margin: 0 }}>{outboundFlightArrivalTime}</h4>
                <p style={{ margin: 0 }}>
                  {outboundFlightDestinationAirportCode}
                </p>
              </div>
            </div>
          </div>
        </Grid>

        {/* Return Flight */}
        {roundTrip && (
          <Grid display={"flex"} alignItems={"center"} gap={"16px"}>
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
                    {calculateDurationHoursAndMinutes(
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
          </Grid>
        )}

        <p style={{ fontSize: "14px", color: "#555", marginTop: "auto" }}>
          {returnOperatingAirlineName
            ? outboundOperatingAirlineName === returnOperatingAirlineName
              ? outboundOperatingAirlineName
              : `${outboundOperatingAirlineName} & ${returnOperatingAirlineName}`
            : outboundOperatingAirlineName}
        </p>
      </div>

      {/* Price & Booking Info */}
      {!adminView && (
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
                  / traveller
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
      )}
    </div>
  );
};
