import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./DateRangePicker.css";

export const DateRangePicker = ({ roundTrip }) => {
  const [dateRange, setDateRange] = React.useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [startDate2, setStartDate2] = React.useState(new Date());

  return (
    <>
      {roundTrip == 0 ? (
        <DatePicker
          selectsRange
          startDate={startDate}
          endDate={endDate}
          onChange={(update) => setDateRange(update)}
          monthsShown={2}
          dateFormat="dd/MM/yyyy"
          placeholderText="Select a departure and return date"
        />
      ) : (
        <DatePicker
          selected={startDate2}
          dateFormat="dd/MM/yyyy"
          onChange={(date) => setStartDate2(date)}
        />
      )}
    </>
  );
};
