import React from "react";

import { Heart, Forward } from "lucide-react";
import { getFlightById } from "@api/flightApi";
import {
  calculateDurationHoursAndMinutesFromIso,
  formatDate3elements,
  formatTime2Digit,
} from "@formatters/DateFormatters";
import { PageTemplate } from "@templates/PageTemplate/PageTempate";
import { ButtonSmall } from "@atoms/ButtonSmall";
import { LoadingSpinner } from "@atoms/LoadingSpinner";
import { PriceDetailsAccordion } from "@atoms/Accordion/PriceDetailsAccordion";

import "./SearchResultDetails.css";

export const SearchResultDetails = () => {
  const [outboundFlight, setOutboundFlight] = React.useState(null);
  const [returnFlight, setReturnFlight] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  const params = new URLSearchParams(location.search);

  const outboundFlightId = params.get("outboundFlightId");
  const returnFlightId = params.get("returnFlightId");
  const numAdults = parseInt(params.get("numAdults") || "1");
  const numChildren = parseInt(params.get("numChildren") || "0");
  const numInfants = parseInt(params.get("numInfants") || "0");
  const totalPassengers = numAdults + numChildren + numInfants;

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const [outboundRes, returnRes] = await Promise.all([
          getFlightById(outboundFlightId),
          returnFlightId
            ? getFlightById(returnFlightId)
            : Promise.resolve(null),
        ]);
        setOutboundFlight(outboundRes.data);
        setReturnFlight(returnRes?.data || null);
      } catch (err) {
        setError("Failed to load flight details");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const calculatePrice = (price) => {
    const childPrice = price * 0.85;
    const totalPrice = numAdults * price + numChildren * childPrice;
    return totalPrice;
  };

  const handleSaveBooking = () => {
    console.log("Booking saved!");
  };

  const handleShareBooking = () => {
    console.log("Booking shared!");
  };

  return (
    <PageTemplate>
      {loading && <LoadingSpinner />}
      {error && <div>{error}</div>}
      {!loading && !error && outboundFlight && (
        <div className="flight-details">
          <div className="details-section">
            <div style={{ marginBottom: "10px" }}>
              <h3>Choose where you want to order</h3>
              <p>
                These are the lowest prices from our providers, especially for
                you!
              </p>
            </div>

            {outboundFlight?.prices?.map((flightPrice, index) => {
              const title = (
                <>
                  <b style={{ fontSize: "1.5rem" }}>
                    {flightPrice.priceProviderName}
                  </b>
                  <div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <b style={{ fontSize: "1.6rem" }}>
                        {flightPrice.price} {flightPrice.currency}
                      </b>
                      <p className="traveller-label"> / traveller</p>
                    </div>
                    {calculatePrice(flightPrice.price) !==
                      flightPrice.price && (
                      <p className="total-price-label">
                        {`${calculatePrice(flightPrice.price)} ${
                          flightPrice.currency
                        } in total`}
                      </p>
                    )}
                  </div>
                </>
              );

              const content = (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                  }}
                >
                  <div>
                    <div style={{ marginBottom: "10px" }}>
                      <b>
                        {outboundFlight.departureAirport.code} →{" "}
                        {outboundFlight.arrivalAirport.code}{" "}
                      </b>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "20px",
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <b>Available classes:</b>
                        <p>{outboundFlight.availableClasses}</p>
                      </div>
                      <div style={{ flex: 1 }}>
                        <b>Extra features: </b>
                        <p>{outboundFlight.extraFeatures}</p>
                      </div>
                    </div>
                  </div>
                  {returnFlight && (
                    <>
                      <hr />
                      <div>
                        <div style={{ marginBottom: "10px" }}>
                          <b>
                            {returnFlight.departureAirport.code} →{" "}
                            {returnFlight.arrivalAirport.code}{" "}
                          </b>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: "20px",
                          }}
                        >
                          <div style={{ flex: 1 }}>
                            <b>Available classes:</b>
                            <p>{returnFlight.availableClasses}</p>
                          </div>
                          <div style={{ flex: 1 }}>
                            <b>Extra features: </b>
                            <p>{returnFlight.extraFeatures}</p>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              );

              return (
                <PriceDetailsAccordion
                  key={index}
                  items={[
                    {
                      title: title,
                      content: content,
                      actions: (
                        <ButtonSmall
                          bgColor={"var(--green)"}
                          hoverBgColor={"var(--greenLight)"}
                        >
                          Book
                        </ButtonSmall>
                      ),
                    },
                  ]}
                />
              );
            })}
          </div>

          <div className="flight-card-section">
            <div style={{ marginBottom: "15px" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <h4>
                  {outboundFlight.arrivalAirport.city} to{" "}
                  {outboundFlight.departureAirport.city}
                </h4>
                <div>
                  <Heart className="icon-button" onClick={handleSaveBooking} />
                  <Forward
                    className="icon-button"
                    onClick={handleShareBooking}
                  />
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                {outboundFlight.roundTrip ? <p>Round Trip</p> : <p>One Way</p>}
                <p>, {totalPassengers} Travellers</p>
              </div>
            </div>

            <div className="flight-card">
              <div className="flight-info">
                <div className="flight-info-header">
                  <img
                    src={`/airline_logos/${outboundFlight.airline.logoFileName}.png`}
                    alt={outboundFlight.airline.name}
                  />
                  <div className="flight-info-details">
                    <b>
                      {outboundFlight.departureAirport.code} →{" "}
                      {outboundFlight.arrivalAirport.code}{" "}
                      {formatDate3elements(outboundFlight.departureTime)}
                    </b>
                    <p
                      style={{ fontSize: "1.4rem" }}
                    >{`Direct • ${calculateDurationHoursAndMinutesFromIso(
                      outboundFlight.departureTime,
                      outboundFlight.arrivalTime
                    )}`}</p>
                  </div>
                </div>

                <div style={{ padding: "10px" }}>
                  <b>
                    {formatTime2Digit(outboundFlight.departureTime)} →{" "}
                    {formatTime2Digit(outboundFlight.arrivalTime)}{" "}
                    {`(${calculateDurationHoursAndMinutesFromIso(
                      outboundFlight.departureTime,
                      outboundFlight.arrivalTime
                    )})`}
                  </b>

                  <p style={{ fontSize: "1.4rem" }}>
                    {outboundFlight.departureAirport.name}{" "}
                    {`(${outboundFlight.departureAirport.code})`} -{" "}
                    {outboundFlight.arrivalAirport.name}{" "}
                    {`(${outboundFlight.arrivalAirport.code})`}
                  </p>
                  <p style={{ fontSize: "1.4rem" }}>
                    {outboundFlight.airline.name}
                  </p>
                </div>
              </div>
            </div>

            {returnFlight && (
              <div className="flight-card">
                <div className="flight-info">
                  <div className="flight-info-header">
                    <img
                      src={`/airline_logos/${returnFlight.airline.logoFileName}.png`}
                      alt={returnFlight.airline.name}
                    />
                    <div className="flight-info-details">
                      <b>
                        {returnFlight.departureAirport.code} →{" "}
                        {returnFlight.arrivalAirport.code}{" "}
                        {formatDate3elements(returnFlight.departureTime)}
                      </b>
                      <p
                        style={{ fontSize: "1.4rem" }}
                      >{`Direct • ${calculateDurationHoursAndMinutesFromIso(
                        returnFlight.departureTime,
                        returnFlight.arrivalTime
                      )}`}</p>
                    </div>
                  </div>

                  <div style={{ padding: "10px" }}>
                    <b>
                      {formatTime2Digit(returnFlight.departureTime)} →{" "}
                      {formatTime2Digit(returnFlight.arrivalTime)}{" "}
                      {`(${calculateDurationHoursAndMinutesFromIso(
                        returnFlight.departureTime,
                        returnFlight.arrivalTime
                      )})`}
                    </b>
                    <p style={{ fontSize: "1.4rem" }}>
                      {returnFlight.departureAirport.name}{" "}
                      {`(${returnFlight.departureAirport.code})`} -{" "}
                      {returnFlight.arrivalAirport.name}{" "}
                      {`(${returnFlight.arrivalAirport.code})`}
                    </p>
                    <p>{returnFlight.airline.name}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </PageTemplate>
  );
};
