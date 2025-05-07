import React from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { Search } from "lucide-react";
import { Button } from "@atoms/Button";
import { Select } from "@atoms/Select";
import { DateRangePicker } from "@atoms/DatePicker/DateRangePicker";
import LocationSwitcher from "@molecules/LocationSwitcher/LocationSwitcher";
import BookingOptionsModal from "@organisms/BookingOptionsModal/BookingOptionsModal";
import "./ActiveSearchPanel.css";

export const ActiveSearchPanel = ({
  initialFrom,
  initialTo,
  initialIsRoundTrip,
  initialDateRange,
  initialOneWayDate,
  initialPassengers,
}) => {
  const [isRoundTrip, setIsRoundTrip] = React.useState(
    initialIsRoundTrip ?? true
  );
  const [from, setFrom] = React.useState(initialFrom ?? "");
  const [to, setTo] = React.useState(initialTo ?? "");
  const [dateRange, setDateRange] = React.useState(
    initialDateRange ?? [null, null]
  );
  const [oneWayDepartureDate, setOneWayDepartureDate] = React.useState(
    initialOneWayDate ?? new Date()
  );

  const [passengers, setPassengers] = React.useState(
    initialPassengers ?? {
      adult: 1,
      child: 0,
      infant: 0,
    }
  );

  const navigate = useNavigate();

  const formatDate = (date) => {
    const formatted = moment(date).format("YYYY-MM-DDTHH:mm:ss.SSS");
    return formatted;
  };

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
      ? formatDate(dateRange[0])
      : formatDate(oneWayDepartureDate);

    const end = isRoundTrip ? formatDate(dateRange[1]) : "";

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
    <div className="active-search-panel">
      <div className="input-row">
        <div className="location-switcher">
          <LocationSwitcher
            from={from}
            setFrom={setFrom}
            to={to}
            setTo={setTo}
          />
        </div>
        <div className="booking-options">
          <BookingOptionsModal
            passengers={passengers}
            setPassengers={setPassengers}
          />
          <Select
            value={isRoundTrip ? "true" : "false"}
            onChange={(e) => setIsRoundTrip(e.target.value === "true")}
          />
        </div>
      </div>
      <div className="input-row">
        <div className="date-picker">
          <DateRangePicker
            roundTrip={isRoundTrip}
            dateRange={dateRange}
            setDateRange={setDateRange}
            oneWayDate={oneWayDepartureDate}
            setOneWayDate={handleOneWayDateChange}
          />
        </div>
        <div className="search-button-container">
          <Button
            width={"100%"}
            height={"60px"}
            onClick={handleSearch}
            disabled={isSearchDisabled()}
          >
            <Search size={25} />
          </Button>
        </div>
      </div>
    </div>
  );
};
