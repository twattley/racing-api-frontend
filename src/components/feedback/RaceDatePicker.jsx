import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

export function RaceDatePicker({ onDateChange }) {
  const [selectedDate, setSelectedDate] = useState(null); // No default date

  const handleChange = (date) => {
    setSelectedDate(date);
    const formattedDate = date ? format(date, "yyyy-MM-dd") : null;
    onDateChange(formattedDate); // Call the callback with the formatted date
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


