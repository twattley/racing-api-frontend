import React from "react";
import { useFetch } from "../../hooks/useFetch";
import { TodaysRaceTimes } from "../../components/TodaysRaces";

export function TodaysRaces() {
  const {
    data: todaysRaceData,
    error: todaysRaceDataError,
    loading: todaysRaceDataLoading,
  } = useFetch("/today/todays-races/by-date", {});

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
      />
    </div>
  );
}
