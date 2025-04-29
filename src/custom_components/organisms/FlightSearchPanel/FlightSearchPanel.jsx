import React from "react";
import { Card } from "@atoms/Card/Card";
import { Button } from "@atoms/Button";
import BookingOptionsModal from "../BookingOptionsModal/BookingOptionsModal";
import LocationSwitcher from "@molecules/LocationSwitcher/LocationSwitcher";
import { Select } from "@atoms/Select";
import { useNavigate } from "react-router-dom";
import { DateRangePicker } from "@atoms/DatePicker/DateRangePicker";
import moment from "moment";
import "./FlightSearchPanel.css";

export const FlightSearchPanel = () => {
  const [isRoundTrip, setIsRoundTrip] = React.useState(true);
  const [from, setFrom] = React.useState("");
  const [to, setTo] = React.useState("");
  const [dateRange, setDateRange] = React.useState([null, null]);
  const [oneWayDepartureDate, setOneWayDepartureDate] = React.useState(
    new Date()
  );

  const navigate = useNavigate();

  const formatDate = (date) => {
    const formatted = moment(date).format("YYYY-MM-DDTHH:mm:ss.SSS");
    return formatted;
  };

  //TODO: Fix date formatting for one way trip
  const handleSearch = () => {
    const start = isRoundTrip
      ? formatDate(dateRange[0])
      : formatDate(oneWayDepartureDate);

    const end = isRoundTrip ? formatDate(dateRange[1]) : "";

    const params = new URLSearchParams({
      from,
      to,
      start,
      end,
      roundTrip: isRoundTrip,
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

  console.log(formatDate(dateRange[0]));
  console.log(formatDate(dateRange[1]));
  console.log(formatDate(oneWayDepartureDate));
  console.log(isRoundTrip);
  console.log(from);
  console.log(to);

  return (
    <Card flexDirection="column" maxWidth={"900px"}>
      <h1 style={{ color: "var(--textColor)" }}>Find your next flight</h1>
      <LocationSwitcher from={from} setFrom={setFrom} to={to} setTo={setTo} />

      <div className="booking-options-container">
        <DateRangePicker
          roundTrip={isRoundTrip}
          dateRange={dateRange}
          setDateRange={setDateRange}
          oneWayDate={oneWayDepartureDate}
          setOneWayDate={setOneWayDepartureDate}
        />
      </div>

      <div className="booking-options-container">
        <div style={{ width: "100%" }}>
          <BookingOptionsModal />
        </div>
        <div style={{ width: "100%" }}>
          <Select
            value={isRoundTrip ? "true" : "false"}
            onChange={(e) => setIsRoundTrip(e.target.value === "true")}
          />
        </div>
      </div>

      <Button onClick={handleSearch} disabled={isSearchDisabled()}>
        Search
      </Button>
    </Card>
  );
};
