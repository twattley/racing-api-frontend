import React, { useState, useEffect, useCallback } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { useFetch } from "../../hooks/useFetch";
import { usePost } from "../../hooks/usePost";
import { RaceDatePicker } from "../../components/feedback/RaceDatePicker";
import { TodaysRaceTimes } from "../../components/TodaysRaces";

export function FeedBackRaces() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [formattedDate, setFormattedDate] = useState(null);
  const [feedbackData, setFeedbackData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const {
    data: currentDateData,
    error: currentDateError,
    loading: currentDateLoading,
  } = useFetch("/feedback/todays-races/current-date");

  const { postData } = usePost("/feedback/todays-races/selected-date", {});

  const fetchFeedbackData = useCallback(async (date) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/feedback/todays-races/by-date?date=${date}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch feedback data");
      }
      const data = await response.json();
      setFeedbackData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (currentDateData && isInitialLoad) {
      const initialDate = new Date(currentDateData.today_date);
      setSelectedDate(initialDate);
      const formatted = format(initialDate, "yyyy-MM-dd");
      setFormattedDate(formatted);
      fetchFeedbackData(formatted);
      setIsInitialLoad(false);
    }
  }, [currentDateData, fetchFeedbackData, isInitialLoad]);

  const handleDateChange = useCallback(
    (date) => {
      if (date) {
        const newDate = new Date(date);
        setSelectedDate(newDate);
        const formatted = format(newDate, "yyyy-MM-dd");
        setFormattedDate(formatted);
        postData({ date: formatted })
          .then(() => fetchFeedbackData(formatted))
          .catch((err) => {
            console.error("Error posting data:", err);
            setError("Failed to update selected date");
          });
      } else {
        setSelectedDate(null);
        setFormattedDate(null);
      }
    },
    [postData, fetchFeedbackData]
  );

  if (currentDateLoading || isLoading) {
    return <p>Loading data...</p>;
  }
  if (currentDateError)
    return <p>Error fetching current date: {currentDateError.message}</p>;
  if (error) return <p>Error: {error}</p>;
  if (!selectedDate || !feedbackData)
    return <p>No data available. Please select a date.</p>;

  return (
    <div className="container mx-auto p-4">
      <RaceDatePicker
        onDateChange={handleDateChange}
        selectedDate={selectedDate}
      />
      <TodaysRaceTimes
        todaysRaceDataType="feedback"
        todaysRaceData={feedbackData}
      />
    </div>
  );
}
