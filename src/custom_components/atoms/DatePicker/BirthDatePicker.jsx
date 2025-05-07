import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./DateRangePicker.css"; // optional, your own styles

export const BirthDatePicker = ({ formData, setFormData }) => {
  const handleDateChange = (date) => {
    setFormData({ ...formData, dateOfBirth: date });
  };

  return (
    <DatePicker
      id="dob"
      selected={formData.dateOfBirth}
      onChange={handleDateChange}
      dateFormat="dd/MM/yyyy"
      showYearDropdown
      showMonthDropdown
      dropdownMode="select"
      placeholderText="DD/MM/YYYY"
      maxDate={new Date()}
      isClearable
    />
  );
};
