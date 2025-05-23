import React from "react";
import { useNavigate } from "react-router-dom";
import { formatDateIsoMs } from "@formatters/DateFormatters";
import { Button } from "@atoms/Button";
import { Select } from "@atoms/Select";
import { Card } from "@atoms/Card/Card";
import { DateRangePicker } from "@atoms/DatePicker/DateRangePicker";
import LocationSwitcher from "@molecules/LocationSwitcher/LocationSwitcher";
import BookingOptionsModal from "@organisms/BookingOptionsModal/BookingOptionsModal";
import "./FlightSearchPanel.css";

export const FlightSearchPanel = () => {
  const [isRoundTrip, setIsRoundTrip] = React.useState(true);
  const [from, setFrom] = React.useState("");
  const [to, setTo] = React.useState("");
  const [dateRange, setDateRange] = React.useState([null, null]);
  const [oneWayDepartureDate, setOneWayDepartureDate] = React.useState(
    new Date()
  );

  const [passengers, setPassengers] = React.useState({
    adult: 1,
    child: 0,
    infant: 0,
  });

  const navigate = useNavigate();

  const handleOneWayDateChange = (date) => {
    if (date) {
      const normalizedDate = new Date(date);
      normalizedDate.setHours(0, 0, 0, 0);
      setOneWayDepartureDate(normalizedDate);
    } else {
      setOneWayDepartureDate(null);
    }
  };

  const handleSearch = () => {
    const start = isRoundTrip
      ? formatDateIsoMs(dateRange[0])
      : formatDateIsoMs(oneWayDepartureDate);

    const end = isRoundTrip ? formatDateIsoMs(dateRange[1]) : "";

    const params = new URLSearchParams({
      from,
      to,
      start,
      end,
      roundTrip: isRoundTrip,
      adult: passengers.adult,
      child: passengers.child,
      infant: passengers.infant,
    });

    navigate(`/search-results?${params.toString().replace(/\+/g, "%2B")}`);
  };

  const isSearchDisabled = () => {
    if (!from || !to) return true;

    if (isRoundTrip) {
      return !dateRange[0] || !dateRange[1];
    } else {
      return !oneWayDepartureDate;
    }
  };

  return (
    <Card flexDirection="column" maxWidth={"900px"}>
      <h1 style={{ color: "var(--textColor)" }}>Find your next flight</h1>
      <LocationSwitcher from={from} setFrom={setFrom} to={to} setTo={setTo} />

      <div className="booking-options-container">
        <div style={{ width: "100%" }}>
          <BookingOptionsModal
            passengers={passengers}
            setPassengers={setPassengers}
          />
        </div>
        <div style={{ width: "100%" }}>
          <Select
            value={isRoundTrip ? "true" : "false"}
            onChange={(e) => setIsRoundTrip(e.target.value === "true")}
          />
        </div>
      </div>

      <div className="booking-options-container">
        <DateRangePicker
          roundTrip={isRoundTrip}
          dateRange={dateRange}
          setDateRange={setDateRange}
          oneWayDate={oneWayDepartureDate}
          setOneWayDate={handleOneWayDateChange}
        />
      </div>

      <Button onClick={handleSearch} disabled={isSearchDisabled()}>
        Search
      </Button>
    </Card>
  );
};
