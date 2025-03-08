import React from "react";
import { Card } from "../../atoms/Card/Card";
import { Button } from "../../atoms/Button";
import BookingOptionsModal from "../BookingOptionsModal/BookingOptionsModal";
import LocationSwitcher from "../../molecules/LocationSwitcher/LocationSwitcher";
import "./FlightSearchPanel.css";

export const FlightSearchPanel = () => {
  const [departureDate, setDepartureDate] = React.useState("");
  const [returnDate, setReturnDate] = React.useState("");

  React.useEffect(() => {
    const currentDate = new Date().toISOString().split("T")[0];
    setDepartureDate(currentDate);
    setReturnDate(currentDate);
  }, []);

  return (
    <Card flexDirection="column" maxWidth={"900px"}>
      <h1 style={{ color: "var(--textColor)" }}>Find your next flight</h1>
      <LocationSwitcher />

      {/* This date picker is temporary, it will be replaced with a better solution later. */}
      <div className="date-picker-container">
        <input
          type="date"
          value={departureDate}
          onChange={(e) => setDepartureDate(e.target.value)}
          onFocus={(e) => e.target.showPicker && e.target.showPicker()}
        />
        <input
          type="date"
          value={returnDate}
          onChange={(e) => setReturnDate(e.target.value)}
          onFocus={(e) => e.target.showPicker && e.target.showPicker()}
        />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-evenly",
          gap: "16px",
        }}
      >
        <BookingOptionsModal />
      </div>
      <Button>Search</Button>
    </Card>
  );
};
