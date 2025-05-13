import React from "react";
import { getBookingsByUserId } from "@api/bookingApi";
import { useAuth } from "@hooks/useAuth";
import { formatDate3elements } from "@formatters/DateFormatters";
import { PageTemplate } from "@templates/PageTemplate/PageTempate";
import { LoadingSpinner } from "@atoms/LoadingSpinner";

export const SavedTrips = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchSavedTrips = async () => {
      try {
        if (user?.userId) {
          const response = await getBookingsByUserId(user.userId);
          setBookings(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch saved trips:", error);
        setError("Unable to load saved trips.");
      } finally {
        setLoading(false);
      }
    };

    fetchSavedTrips();
  }, [user]);

  return (
    <PageTemplate>
      <div>
        <h1>Saved Trips</h1>
        {loading && <LoadingSpinner />}
        {error && <h3>{error}</h3>}
        {!loading && bookings.length === 0 && <h3>No saved trips found</h3>}
        {!loading &&
          bookings.map((booking) => {
            const outboundFlight = booking.flights[0];
            const returnFlight = booking.flights[1];

            const tripCity = outboundFlight?.arrivalAirport?.city || "Unknown";

            return (
              <div
                key={booking.bookingId}
                style={{
                  marginBottom: "2rem",
                  padding: "1rem",
                  border: "1px solid #ccc",
                  borderRadius: "10px",
                  backgroundColor: "#f9f9f9",
                }}
              >
                <h2 style={{ marginBottom: "0.5rem" }}>{tripCity} - trip</h2>

                {returnFlight ? (
                  <p>
                    {formatDate3elements(outboundFlight?.departureTime)} -{" "}
                    {formatDate3elements(returnFlight?.departureTime)}
                  </p>
                ) : (
                  <p>{formatDate3elements(outboundFlight?.departureTime)}</p>
                )}
              </div>
            );
          })}
      </div>
    </PageTemplate>
  );
};
