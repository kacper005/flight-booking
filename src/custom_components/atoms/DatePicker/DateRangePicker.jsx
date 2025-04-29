import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./DateRangePicker.css";

export const DateRangePicker = ({
  roundTrip,
  dateRange,
  setDateRange,
  oneWayDate,
  setOneWayDate,
}) => {
  const [startDate, endDate] = dateRange;

  return (
    <>
      {roundTrip ? (
        <DatePicker
          selectsRange
          startDate={startDate}
          endDate={endDate}
          onChange={(date) => setDateRange(date)}
          monthsShown={2}
          dateFormat="dd/MM/yyyy"
          placeholderText="Select a departure and return date"
          minDate={new Date()}
        />
      ) : (
        <DatePicker
          selected={oneWayDate}
          dateFormat="dd/MM/yyyy"
          onChange={(date) => setOneWayDate(date)}
          placeholderText="Select a departure date"
          minDate={new Date()}
          isClearable
        />
      )}
    </>
  );
};
