import React from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { Search } from "lucide-react";
import { Button } from "@atoms/Button";
import { Select } from "@atoms/Select";
import { DateRangePicker } from "@atoms/DatePicker/DateRangePicker";
import LocationSwitcher from "@molecules/LocationSwitcher/LocationSwitcher";
import BookingOptionsModal from "@organisms/BookingOptionsModal/BookingOptionsModal";

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
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <div
        className="input-row"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
          width: "100%",
        }}
      >
        <div style={{ flex: 1, minWidth: "280px" }}>
          <LocationSwitcher
            from={from}
            setFrom={setFrom}
            to={to}
            setTo={setTo}
          />
        </div>
        <div
          style={{ flex: 1, minWidth: "280px", display: "flex", gap: "16px" }}
        >
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
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
          width: "100%",
          height: "100%",
          alignItems: "flex-end",
        }}
      >
        <div style={{ flex: 1, minWidth: "280px" }}>
          <DateRangePicker
            roundTrip={isRoundTrip}
            dateRange={dateRange}
            setDateRange={setDateRange}
            oneWayDate={oneWayDepartureDate}
            setOneWayDate={handleOneWayDateChange}
          />
        </div>

        <div>
          <Button
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
