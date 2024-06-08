import React, { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { useFetch } from "../../hooks/useFetch";
import { usePost } from "../../hooks/usePost";
import { RaceDatePicker } from "../../components/feedback/RaceDatePicker";
import { TodaysRaceTimes } from "../../components/TodaysRaces";

export function FeedBackRaces() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [visibleCourses, setVisibleCourses] = useState({});

  const {
    data: currentDateData,
    error: currentDateError,
    loading: currentDateLoading,
  } = useFetch("/feedback/todays-races/current-date", {});

  useEffect(() => {
    if (currentDateData && !selectedDate) {
      setSelectedDate(new Date(currentDateData.today_date));
    }
  }, [currentDateData, selectedDate]);

  const formattedDate = selectedDate
    ? format(selectedDate, "yyyy-MM-dd")
    : null;
  const endpoint = formattedDate
    ? `/feedback/todays-races/by-date?date=${formattedDate}`
    : null;

  const {
    data: feedbackData,
    error: feedbackDataError,
    loading: feedbackDataLoading,
  } = useFetch(endpoint, { dependencies: [endpoint] });

  const {
    data: postResponse,
    error: postError,
    loading: postLoading,
    postData,
  } = usePost("/feedback/todays-races/selected-date", {}); // Use usePost hook

  useEffect(() => {
    if (feedbackData) {
      const initialVisibility = {};
      feedbackData.forEach((raceDay) => {
        raceDay.courses.forEach((_, courseIndex) => {
          initialVisibility[courseIndex] = true;
        });
      });
      setVisibleCourses(initialVisibility);
    }
  }, [feedbackData]);

  useEffect(() => {
    if (formattedDate) {
      postData({ date: formattedDate });
    }
  }, [formattedDate]);

  const toggleCourseVisibility = (courseIndex) => {
    setVisibleCourses((prevState) => ({
      ...prevState,
      [courseIndex]: !prevState[courseIndex],
    }));
  };

  if (
    currentDateLoading ||
    (feedbackDataLoading && !formattedDate) ||
    postLoading
  ) {
    return <p>Loading data...</p>;
  }
  if (currentDateError) {
    return <p>Error fetching current date: {currentDateError.message}</p>;
  }
  if (feedbackDataError) {
    return <p>Error fetching data: {feedbackDataError.message}</p>;
  }
  if (postError) {
    return <p>Error posting data: {postError.message}</p>;
  }
  if (!selectedDate || !feedbackData) {
    return <p>No data available. Please select a date.</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <RaceDatePicker onDateChange={setSelectedDate} />
      <TodaysRaceTimes
        todaysRaceDataType="feedback"
        todaysRaceData={feedbackData}
        visibleCourses={visibleCourses}
        toggleCourseVisibility={toggleCourseVisibility}
      />
    </div>
  );
}
