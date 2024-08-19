import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

export function RaceDatePicker({ onDateChange, selectedDate }) {
  const handleChange = (date) => {
    const formattedDate = date ? format(date, "yyyy-MM-dd") : null;
    onDateChange(formattedDate);
  };

  return (
    <DatePicker
      selected={selectedDate}
      onChange={handleChange}
      dateFormat="yyyy-MM-dd"
      className="border p-2 rounded"
      placeholderText="Select a date"
    />
  );
}
