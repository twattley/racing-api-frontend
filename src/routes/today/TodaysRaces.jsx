import React, { useState, useEffect } from "react";
import { useFetch } from "../../hooks/useFetch";
import { TodaysRaceTimes } from "../../components/TodaysRaces";

export function TodaysRaces() {
  const [visibleCourses, setVisibleCourses] = useState({});

  const {
    data: todaysRaceData,
    error: todaysRaceDataError,
    loading: todaysRaceDataLoading,
  } = useFetch("/today/todays-races/by-date", {});

  useEffect(() => {
    if (todaysRaceData) {
      const initialVisibility = {};
      todaysRaceData.forEach((raceDay) => {
        raceDay.courses.forEach((_, courseIndex) => {
          initialVisibility[courseIndex] = true;
        });
      });
      setVisibleCourses(initialVisibility);
    }
  }, [todaysRaceData]);

  const toggleCourseVisibility = (courseIndex) => {
    setVisibleCourses((prevState) => ({
      ...prevState,
      [courseIndex]: !prevState[courseIndex],
    }));
  };

  if (todaysRaceDataLoading) {
    return <p>Loading data...</p>;
  }
  if (todaysRaceDataError) {
    return <p>Error fetching data: {todaysRaceDataError.message}</p>;
  }
  if (!todaysRaceData) {
    return <p>No data available. Please select a date.</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <TodaysRaceTimes
        todaysRaceDataType="todays"
        todaysRaceData={todaysRaceData}
        visibleCourses={visibleCourses}
        toggleCourseVisibility={toggleCourseVisibility}
      />
    </div>
  );
}
