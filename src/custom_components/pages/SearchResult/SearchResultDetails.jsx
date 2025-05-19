import React from "react";
import { useNavigate } from "react-router-dom";
import { Heart, Forward } from "lucide-react";
import { getFlightById } from "@api/flightApi";
import {
  getBookingsByUserId,
  createBooking,
  deleteBooking,
  addFlightsToBooking,
} from "@api/bookingApi";
import { useAuth } from "@hooks/useAuth";
import { PageTemplate } from "@templates/PageTemplate/PageTempate";
import { showToast } from "@atoms/Toast/Toast";
import { ButtonSmall } from "@atoms/ButtonSmall";
import { LoadingSpinner } from "@atoms/LoadingSpinner";
import { PriceDetailsAccordion } from "@atoms/Accordion/PriceDetailsAccordion";
import { FlightCard } from "./FlightCard";
import "./SearchResultDetails.css";

export const SearchResultDetails = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [outboundFlight, setOutboundFlight] = React.useState(null);
  const [returnFlight, setReturnFlight] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [isSaved, setIsSaved] = React.useState(false);
  const [savedBookingId, setSavedBookingId] = React.useState(null);

  const params = new URLSearchParams(location.search);
  const outboundFlightId = params.get("outboundFlightId");
  const returnFlightId = params.get("returnFlightId");
  const numAdults = parseInt(params.get("numAdults") || "1");
  const numChildren = parseInt(params.get("numChildren") || "0");
  const numInfants = parseInt(params.get("numInfants") || "0");
  const totalPassengers =
    parseInt(params.get("totalPassengers")) ||
    numAdults + numChildren + numInfants;

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const [outboundRes, returnRes] = await Promise.all([
          getFlightById(outboundFlightId),
          returnFlightId
            ? getFlightById(returnFlightId)
            : Promise.resolve(null),
        ]);
        const outbound = outboundRes.data;
        const rtn = returnRes?.data || null;
        setOutboundFlight(outbound);
        setReturnFlight(rtn);

        if (user) {
          const bookingsRes = await getBookingsByUserId(user.userId);
          const existingBooking = bookingsRes.data.find((booking) =>
            booking.flights.some((f) =>
              [outbound.flightId, rtn?.flightId].includes(f.flightId)
            )
          );
          if (existingBooking) {
            setIsSaved(true);
            setSavedBookingId(existingBooking.bookingId);
          }
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load flight details");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, outboundFlightId, returnFlightId]);

  const calculatePrice = (price) => {
    const childPrice = price * 0.85;
    return numAdults * price + numChildren * childPrice;
  };

  const handleShareBooking = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() =>
        showToast({ message: "Link copied to clipboard!", type: "success" })
      )
      .catch((err) => console.error("Failed to copy link: ", err));
  };

  const handleToggleBooking = async () => {
    if (!user) {
      showToast({
        message: "You must be logged in to manage a booking.",
        type: "error",
      });
      return;
    }

    try {
      if (isSaved && savedBookingId) {
        await deleteBooking(savedBookingId);
        setIsSaved(false);
        setSavedBookingId(null);
        showToast({
          message: "Booking removed successfully!",
          type: "success",
        });
      } else {
        const bookingData = {
          user: { userId: user.userId },
          bookingDate: new Date().toISOString(),
          numberOfTravellers: totalPassengers,
        };

        const bookingRes = await createBooking(bookingData);
        const bookingId = bookingRes.data.bookingId;

        const flights = [{ flightId: outboundFlight.flightId }];
        if (returnFlight) flights.push({ flightId: returnFlight.flightId });

        await addFlightsToBooking(bookingId, flights);
        setIsSaved(true);
        setSavedBookingId(bookingId);
        showToast({ message: "Booking saved successfully!", type: "success" });
      }
    } catch (error) {
      showToast({ message: "Failed to update booking.", type: "error" });
    }
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

            {outboundFlight.prices.map((flightPrice, index) => {
              const total = calculatePrice(flightPrice.price);
              return (
                <PriceDetailsAccordion
                  key={index}
                  items={[
                    {
                      title: (
                        <>
                          <b style={{ fontSize: "1.5rem" }}>
                            {flightPrice.priceProviderName}
                          </b>
                          <div>
                            <div
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <b style={{ fontSize: "1.6rem" }}>
                                {flightPrice.price} {flightPrice.currency}
                              </b>
                              <p className="traveller-label"> / traveller</p>
                            </div>
                            {total !== flightPrice.price && (
                              <p className="total-price-label">
                                {`${total} ${flightPrice.currency} in total`}
                              </p>
                            )}
                          </div>
                        </>
                      ),
                      content: (
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
                                {outboundFlight.arrivalAirport.code}
                              </b>
                            </div>
                            <div style={{ display: "flex", gap: "20px" }}>
                              <div style={{ flex: 1 }}>
                                <b>Available classes:</b>
                                <p>{outboundFlight.availableClasses}</p>
                              </div>
                              <div style={{ flex: 1 }}>
                                <b>Extra features:</b>
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
                                    {returnFlight.arrivalAirport.code}
                                  </b>
                                </div>
                                <div style={{ display: "flex", gap: "20px" }}>
                                  <div style={{ flex: 1 }}>
                                    <b>Available classes:</b>
                                    <p>{returnFlight.availableClasses}</p>
                                  </div>
                                  <div style={{ flex: 1 }}>
                                    <b>Extra features:</b>
                                    <p>{returnFlight.extraFeatures}</p>
                                  </div>
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      ),
                      actions: (
                        <ButtonSmall
                          bgColor={"var(--green)"}
                          hoverBgColor={"var(--greenLight)"}
                          onClick={() => {
                            navigate("/checkout");
                          }}
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
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h4>
                  {outboundFlight.arrivalAirport.city} to{" "}
                  {outboundFlight.departureAirport.city}
                </h4>
                <div>
                  <Heart
                    className="icon-button"
                    onClick={handleToggleBooking}
                    fill={isSaved ? "red" : "none"}
                    color={isSaved ? "red" : "black"}
                    style={{ cursor: "pointer" }}
                  />
                  <Forward
                    className="icon-button"
                    onClick={handleShareBooking}
                  />
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <p>
                  {outboundFlight.roundTrip ? "Round Trip" : "One Way"},{" "}
                  {totalPassengers} Travellers
                </p>
              </div>
            </div>

            <FlightCard flight={outboundFlight} />
            {returnFlight && <FlightCard flight={returnFlight} />}
          </div>
        </div>
      )}
    </PageTemplate>
  );
};
