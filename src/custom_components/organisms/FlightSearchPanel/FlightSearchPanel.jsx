import React from "react";
import { Card } from "../../atoms/Card/Card";
import { Button } from "../../atoms/Button";
import BookingOptionsModal from "../BookingOptionsModal/BookingOptionsModal";
import { Calendar } from "lucide-react";
import { IconInput } from "../../molecules/IconInput/IconInput";
import LocationSwitcher from "../../molecules/SwitchButton/LocationSwitcher";
import "./FlightSearchPanel.css";

export const FlightSearchPanel = () => {
  return (
    <Card flexDirection="column">
      <h1 style={{ color: "var(--textColor)" }}>Find your next flight</h1>
      <LocationSwitcher />
      <div className="date-picker-container">
        <IconInput type="date" icon={Calendar} />
        <IconInput type="date" icon={Calendar} />
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
        <>
          <BookingOptionsModal />
        </>
      </div>
      <Button>Search</Button>
    </Card>
  );
};
