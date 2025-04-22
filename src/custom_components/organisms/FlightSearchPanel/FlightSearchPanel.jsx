import React from "react";
import { Card } from "@atoms/Card/Card";
import { Button } from "@atoms/Button";
import BookingOptionsModal from "../BookingOptionsModal/BookingOptionsModal";
import LocationSwitcher from "@molecules/LocationSwitcher/LocationSwitcher";
import { Select } from "@/custom_components/atoms/Select";
import { RouteLink } from "@/custom_components/atoms/RouteLink";
import { DateRangePicker } from "@/custom_components/atoms/DatePicker/DateRangePicker";
import "./FlightSearchPanel.css";

export const FlightSearchPanel = () => {
  const [tripType, setTripType] = React.useState(0);

  return (
    <Card flexDirection="column" maxWidth={"900px"}>
      <h1 style={{ color: "var(--textColor)" }}>Find your next flight</h1>
      <LocationSwitcher />

      <div className="booking-options-container">
        <DateRangePicker roundTrip={tripType} />
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

      <RouteLink margin="0" to={"search-results"}>
        <Button>Search</Button>
      </RouteLink>
    </Card>
  );
};
