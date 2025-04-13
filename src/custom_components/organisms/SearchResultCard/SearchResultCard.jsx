import React from "react";
import { Button } from "@atoms/Button";

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
}) => {
  return (
    <div style={{ width: "85%", display: "flex", justifyContent: "center" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          minWidth: "730px",
          minHeight: "200px",
          backgroundColor: "#ffffff",
          borderRadius: "8px",
          boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
          padding: "16px",
        }}
      >
        <div
          style={{
            width: "75%",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "16px",
              padding: "5px",
              marginBottom: "10px",
            }}
          >
            <img
              style={{ width: "40px", height: "34px" }}
              src={`/airline_logos/${outboundOperatingAirlineLogo}.png`}
              alt="Outbound Airline Logo"
            />
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "flex-start",
                gap: "10px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <p>
                  <b>Departure</b>
                </p>

                <p style={{ fontWeight: "bold" }}>
                  {outbandFlightDepartureDate}
                </p>
              </div>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <h4 style={{ fontWeight: "bold" }}>
                    {outbandFlightDepartureTime}
                  </h4>
                  <p>{outbandFlightOriginAirportCode}</p>
                </div>
                <hr style={{ width: "70%" }} />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <h4 style={{ fontWeight: "bold" }}>
                    {outbandFlightArrivalTime}
                  </h4>
                  <p>{outbandFlightDestinationAirportCode}</p>
                </div>
              </div>
            </div>
          </div>
          {roundTrip && (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "16px",
                padding: "5px",
                marginBottom: "10px",
              }}
            >
              <img
                style={{ width: "40px", height: "34px" }}
                src={`/airline_logos/${returnOperatingAirlineLogo}.png`}
                alt="Return Airline Logo"
              />

              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  gap: "10px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <p>
                    <b>Return</b>
                  </p>
                  <p style={{ fontWeight: "bold" }}>
                    {returnFlightDepartureDate}
                  </p>
                </div>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <h4 style={{ fontWeight: "bold" }}>
                      {returnFlightDepartureTime}
                    </h4>
                    <p>{returnFlightOriginAirportCode}</p>
                  </div>
                  <hr style={{ width: "70%" }} />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <h4 style={{ fontWeight: "bold" }}>
                      {returnFlightArrivalTime}
                    </h4>
                    <p>{returnFlightDestinationAirportCode}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          <p style={{ marginTop: "auto", fontSize: "14px", color: "#555" }}>
            {outboundOperatingAirlineName === returnOperatingAirlineName
              ? outboundOperatingAirlineName
              : `${outboundOperatingAirlineName} & ${returnOperatingAirlineName}`}
          </p>
        </div>

        <div
          style={{
            width: "25%",
            textAlign: "right",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            justifyContent: "space-between",
            padding: "5px",
            borderLeft: "2px solid #ccc",
          }}
        >
          <p style={{ fontWeight: "bold", fontSize: "16px", margin: 0 }}>
            Price: {price} {currency}
          </p>
          <b>{availableClasses}</b>
          <b>{extraFeatures}</b>
          <Button>View Trip</Button>
        </div>
      </div>
    </div>
  );
};
