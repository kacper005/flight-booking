import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRightLeft, ArrowRight, Trash2 } from "lucide-react";
import { getBookingsByUserId, deleteBooking } from "@api/bookingApi";
import { useAuth } from "@hooks/useAuth";
import { formatDate3elements } from "@formatters/DateFormatters";
import { PageTemplate } from "@templates/PageTemplate/PageTempate";
import { Grid } from "@atoms/Grid";
import { Button } from "@atoms/Button";
import { ButtonSmall } from "@atoms/ButtonSmall";
import { showToast } from "@atoms/Toast/Toast";
import { LoadingSpinner } from "@atoms/LoadingSpinner";
import "./SavedTrips.css";

export const SavedTrips = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchSavedTrips = async () => {
      try {
        if (user?.userId) {
          const response = await getBookingsByUserId(user.userId);
          setBookings(response.data);
        }
      } catch (error) {
        showToast({
          message: error,
          type: "error",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchSavedTrips();
  }, [user]);

  const handleViewDetails = (
    outboundFlightId,
    returnFlightId = null,
    numberOfTravellers
  ) => {
    const url = `/search-results-details?outboundFlightId=${outboundFlightId}${
      returnFlightId ? `&returnFlightId=${returnFlightId}` : ""
    }&totalPassengers=${numberOfTravellers}`;

    navigate(url);
  };

  const handleRemoveTrip = async (bookingId) => {
    try {
      setLoading(true);
      await deleteBooking(bookingId);
      setBookings((prevBookings) =>
        prevBookings.filter((booking) => booking.bookingId !== bookingId)
      );
      showToast({
        message: "Trip removed successfully",
        type: "success",
      });
    } catch (error) {
      showToast({
        message: error,
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  console.log("Bookings:", bookings);

  return (
    <PageTemplate>
      <h1>Saved Trips</h1>

      {loading && <LoadingSpinner />}
      {error && <h3>{error}</h3>}
      {!loading && bookings.length === 0 && <h3>No saved trips found</h3>}
      {!loading &&
        bookings.map((booking) => {
          const outboundFlight = booking.flights?.[0];
          const returnFlight = booking.flights?.[1];

          if (!outboundFlight) return null;

          const outboundCity = outboundFlight.arrivalAirport?.city || "Unknown";

          return (
            <div
              key={booking.bookingId}
              style={{
                marginBottom: "2rem",
                padding: "1rem",
                border: "1px solid var(--grey)",
                borderRadius: "10px",
                backgroundColor: "var(--white)",
                width: "100%",
                maxWidth: "600px",
              }}
            >
              <h2 style={{ marginBottom: "0.5rem" }}>{outboundCity} Trip</h2>

              <p>
                {formatDate3elements(outboundFlight.departureTime)}
                {returnFlight &&
                  ` - ${formatDate3elements(returnFlight.departureTime)}`}
              </p>

              <Grid
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Grid display={"flex"} alignItems={"center"} gap={"0.5rem"}>
                  <p>{outboundFlight.departureAirport?.code}</p>
                  {returnFlight ? (
                    <ArrowRightLeft size={16} />
                  ) : (
                    <ArrowRight size={16} />
                  )}
                  <p>{outboundFlight.arrivalAirport?.code}</p>
                </Grid>

                <Grid display="flex" gap="0.5rem" alignItems="center">
                  {outboundFlight.status !== "CANCELLED" &&
                  (!returnFlight || returnFlight.status !== "CANCELLED") ? (
                    <>
                      <ButtonSmall
                        title="View Trip"
                        onClick={() =>
                          handleViewDetails(
                            outboundFlight.flightId,
                            returnFlight?.flightId,
                            booking.numberOfTravellers
                          )
                        }
                        margin={"0 5px 0 0"}
                        height={"30px"}
                      >
                        View
                      </ButtonSmall>

                      <button
                        onClick={() => handleRemoveTrip(booking.bookingId)}
                        className={"remove-icon-button"}
                        title="Remove Trip"
                      >
                        <Trash2 size={14} />
                      </button>
                    </>
                  ) : (
                    <>
                      <p style={{ color: "red", fontWeight: "bold" }}>
                        Not Available
                      </p>

                      <button
                        onClick={() => handleRemoveTrip(booking.bookingId)}
                        className={"remove-icon-button"}
                        title="Remove Trip"
                      >
                        <Trash2 size={14} />
                      </button>
                    </>
                  )}
                </Grid>
              </Grid>
            </div>
          );
        })}
    </PageTemplate>
  );
};
