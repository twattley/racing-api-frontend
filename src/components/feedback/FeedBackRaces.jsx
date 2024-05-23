import React from "react";
import { useFetch } from "../../hooks/useFetch";

export function FeedBackRaceTimes() {
  const { data, error, loading } = useFetch(
    "http://localhost:8000/racing-api/api/v1/feedback/todays-races/by-date?date=2023-01-01"
  );

  if (loading) {
    return <p>Loading data...</p>;
  }

  if (error) {
    return <p>Error fetching data: {error.message}</p>;
  }

  if (!data) {
    return <p>No data available.</p>;
  }

  return (
    <div>
      <h1>Race Times</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
