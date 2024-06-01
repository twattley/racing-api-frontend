import React from "react";
import { useFetch } from "../../hooks/useFetch";

export function FeedbackRaceResult() {
  const { data, error, loading } = useFetch(
    "http://localhost:8000/racing-api/api/v1/feedback/todays-races/result/by-race-id?date=2023-01-01&race_id=827248"
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
      <h1>Protected Data</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
