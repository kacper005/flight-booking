import React from "react";
import { ButtonSmall } from "@atoms/ButtonSmall.jsx";
import { Button } from "@atoms/Button.jsx";
import LoadingSpinner from "@atoms/LoadingSpinner";
import { getBookings, updateBooking } from "@api/bookingApi.js";
import { formatDate } from "@formatters/DateFormatters.js";
import { AdminBookingsModal } from "@organisms/AdminBookingsModal.jsx";
import "./AdminFlights.css";
import "./AdminBookings.css";

export const AdminBookings = () => {
  const [bookings, setBookings] = React.useState([]);
  const [loadingBookings, setLoading] = React.useState(true);
  const [bookingsError, setError] = React.useState(null);
  const [selectedBooking, setSelectedBooking] = React.useState(null);

  const getSortedBookingsTable = async () => {
    const res = await getBookings();
    const sorted = res.data.sort((a, b) => a.user.userId - b.user.userId);
    setBookings(sorted);
  };

  React.useEffect(() => {
    const fetchBookings = async () => {
      try {
        await getSortedBookingsTable();
      } catch (error) {
        setError(error.message || "Failed to load bookings.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleSave = async (updatedBooking) => {
    try {
      await updateBooking(updatedBooking.bookingId, updatedBooking);
      await getSortedBookingsTable();
      setSelectedBooking(null);
    } catch (error) {
      console.error("Error updating booking:", error);
    }
  };

  const handleClose = async () => {
    try {
      await getSortedBookingsTable();
      setSelectedBooking(null);
    } catch (error) {
      console.error("Error updating booking:", error);
    }
  };

  // Prevent scrolling behind modal when modal is open
  if (selectedBooking) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  return (
    <div className="adminClassContainer">
      <h1>Edit Bookings</h1>
      {loadingBookings && <LoadingSpinner />}
      {bookingsError && <h3>{bookingsError}</h3>}
      {!loadingBookings && bookings.length === 0 && <h3>No bookings found</h3>}

      {!loadingBookings && bookings.length > 0 && (
        <table className="adminTable">
          <thead>
            <tr>
              <th className="colBookingEmail">Email</th>
              <th className="colBookingId">ID</th>
              <th className="colBookingFlightNumber1">Flt No Dep</th>
              <th className="colBookingDeparture">Departure</th>
              <th className="colBookingDepartureDate">Departure Date</th>
              <th className="colBookingFlightNumber2">Flt No Arr</th>
              <th className="colBookingArrival">Arrival</th>
              <th className="colBookingArrivalDate">Arrival Date</th>
              <th className="colEdit"></th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedBooking(booking);
                }}
              >
                <td className="colBookingEmail">{booking.user.email}</td>
                <td className="colBookingId">{booking.bookingId}</td>
                <td className="colBookingFlightNumber1">
                  {booking.flights?.[0]?.flightNumber}
                </td>
                <td className="colBookingDeparture">
                  {booking.flights?.[0]?.departureAirport.code}
                </td>
                <td className="colBookingDepartureDate">
                  {formatDate(booking.flights?.[0]?.departureTime)}
                </td>
                <td className="colBookingFlightNumber2">
                  {booking.flights?.[1]?.flightNumber}
                </td>
                <td className="colBookingArrival">
                  {booking.flights?.[1]?.departureAirport.code}
                </td>
                <td className="colBookingArrivalDate">
                  {booking.flights?.[1]?.departureTime
                    ? formatDate(booking.flights[1].departureTime)
                    : ""}
                </td>
                <td className="colEdit">
                  <ButtonSmall
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedBooking(booking);
                    }}
                  >
                    View
                  </ButtonSmall>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {selectedBooking && (
        <AdminBookingsModal
          booking={selectedBooking}
          onClose={handleClose}
          onSave={handleSave}
        />
      )}
    </div>
  );
};
