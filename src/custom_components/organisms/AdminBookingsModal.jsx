import React from "react";
import { deleteBooking, updateBooking } from "@api/bookingApi.js";
import { formatDate } from "@formatters/DateFormatters.js";
import { Button } from "@atoms/Button.jsx";
import { showToast } from "@atoms/Toast/Toast.jsx";
import "@organisms/AdminFlightsModal/AdminFlightsModal.css";

export const AdminBookingsModal = ({ booking, onClose, onSave }) => {
  const [formData, setFormData] = React.useState({ ...booking });
  const [errors, setErrors] = React.useState({});

  React.useEffect(() => {
    setFormData({ ...booking });
  }, [booking]);

  const validate = () => {
    let newErrors = {};
    if (!formData.flights[0].flightNumber.trim())
      newErrors.flightNumber = "Flight Number is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleDelete = async (e) => {
    e.preventDefault();

    const userConfirmed = window.confirm(
      "Are you sure you want to delete this feedback?",
    );
    if (userConfirmed) {
      try {
        await deleteBooking(booking.bookingId);
        showToast({
          message: "Booking deleted successfully",
          type: "success",
        });
        onClose();
      } catch (error) {
        console.error("Error deleting booking:", error);
        showToast({
          message: "Failed to delete booking",
          type: "error",
        });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      try {
        const bookingPayload = {
          bookingId: booking.bookingId,

          flights: formData.flights.map((flight) => ({
            flightId: flight.flightId,
          })),
        };

        await updateBooking(booking.bookingId, bookingPayload);
        onSave({ ...booking, ...bookingPayload });
        showToast({
          message: "Booking updated successfully",
          type: "success",
        });
      } catch (error) {
        const message =
          typeof error.response?.data === "string"
            ? error.response.data
            : error.response?.data?.message ||
              "Something went wrong while saving booking data";

        showToast({
          message: `Failed to update booking. ${message}`,
          type: "error",
        });
      }
    }
  };

  return (
    <div className="modalOverlay" onClick={onClose}>
      <div className="modalContent" onClick={(e) => e.stopPropagation()}>
        <h2>Edit Booking</h2>
        <form onSubmit={handleSubmit}>
          <div className="modalGrid">
            <div className="formField">
              <label>Name</label>
              <input
                name={"name"}
                value={formData.user.firstName + " " + formData.user.lastName}
                disabled={true}
              />
            </div>
            <div className="formField">
              <label>Email</label>
              <input
                name={"email"}
                value={formData.user.email}
                disabled={true}
              />
            </div>
            <div className="formField">
              <label>Booking ID</label>
              <input
                name={"bookingId"}
                value={formData.bookingId}
                disabled={true}
              />
            </div>
            <div className="formField">
              <label>Phone</label>
              <input
                name={"phone"}
                value={formData.user.phone}
                disabled={true}
              />
            </div>
          </div>
          <h3 className="h3Flights">Departure Flight:</h3>
          <div className="modalGrid">
            <div className="formField">
              <label>Flight Number</label>
              <input
                name={"flightNumber"}
                value={formData.flights[0].flightNumber}
                disabled={true}
              />
            </div>
            <div className="formField">
              <label>Airline</label>
              <input
                name={"airline"}
                value={formData.flights[0].airline.name}
                disabled={true}
              />
            </div>
            <div className="formField">
              <label>Departure Airport</label>
              <input
                name={"departureAirport"}
                value={formData.flights[0].departureAirport.code}
                disabled={true}
              />
            </div>
            <div className="formField">
              <label>Departure Date</label>
              <input
                name={"departureTime"}
                value={formatDate(formData.flights[0].departureTime)}
                disabled={true}
              />
            </div>
          </div>
          {formData.flights[1] && (
            <>
              <h3 className="h3Flights">Arrival Flight:</h3>
              <div className="modalGrid">
                <div className="formField">
                  <label>Flight Number</label>
                  <input
                    name={"flightNumber"}
                    value={formData.flights[1].flightNumber}
                    disabled={true}
                  />
                </div>
                <div className="formField">
                  <label>Airline</label>
                  <input
                    name={"airline"}
                    value={formData.flights[1].airline.name}
                    disabled={true}
                  />
                </div>
                <div className="formField">
                  <label>Departure Airport</label>
                  <input
                    name={"departureAirport"}
                    value={formData.flights[1].departureAirport.code}
                    disabled={true}
                  />
                </div>
                <div className="formField">
                  <label>Departure Date</label>
                  <input
                    name={"departureTime"}
                    value={formatDate(formData.flights[1].departureTime)}
                    disabled={true}
                  />
                </div>
              </div>
            </>
          )}
        </form>
        <div className="modalActions">
          <Button onClick={onClose}>Cancel</Button>
          <Button
            bgColor={"var(--buttonColorRed)"}
            hoverBgColor={"var(--buttonColorRedHover)"}
            width={"101px"}
            onClick={handleDelete}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};
