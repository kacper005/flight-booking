import React from "react";
import { Card } from "../../atoms/Card/Card";
import { Button } from "../../atoms/Button";
import BookingOptionsModal from "../BookingOptionsModal/BookingOptionsModal";
import LocationSwitcher from "../../molecules/LocationSwitcher/LocationSwitcher";
import "./FlightSearchPanel.css";
import { Select } from "@/custom_components/atoms/Select";

export const FlightSearchPanel = () => {
  const [departureDate, setDepartureDate] = React.useState("");
  const [returnDate, setReturnDate] = React.useState("");
  const [tripType, setTripType] = React.useState("0");

  React.useEffect(() => {
    const currentDate = new Date().toISOString().split("T")[0];
    setDepartureDate(currentDate);
    setReturnDate(currentDate);
  }, []);

  React.useEffect(() => {
    if (tripType === "1") {
      setReturnDate(departureDate);
    }
  }, [departureDate, tripType]);

  return (
    <Card flexDirection="column" maxWidth={"900px"}>
      <h1 style={{ color: "var(--textColor)" }}>Find your next flight</h1>
      <LocationSwitcher />

      {/* This date picker is temporary, it will be replaced with a better solution later. */}
      <div className="date-picker-container">
        <input
          style={{ outlineColor: "var(--mainColor)" }}
          type="date"
          value={departureDate}
          onChange={(e) => setDepartureDate(e.target.value)}
          onFocus={(e) => e.target.showPicker && e.target.showPicker()}
        />
        <input
          style={{ outlineColor: "var(--mainColor)" }}
          type="date"
          value={returnDate}
          onChange={(e) => setReturnDate(e.target.value)}
          onFocus={(e) => e.target.showPicker && e.target.showPicker()}
          disabled={tripType === "1"}
        />
      </div>

      <div className="booking-options-container">
        <div style={{ width: "100%" }}>
          <BookingOptionsModal />
        </div>
        <div style={{ width: "100%" }}>
          <Select
            value={tripType}
            onChange={(e) => setTripType(e.target.value)}
          />
        </div>
      </div>
      <Button>Search</Button>
    </Card>
  );
};
