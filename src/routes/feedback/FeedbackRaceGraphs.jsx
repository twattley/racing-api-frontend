import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { RaceGraph } from "../../components/Graph";

export function FeedbackRaceGraphs() {
  const { race_id } = useParams();
  const {
    data: graphData,
    error: graphDataError,
    loading: graphDataLoading,
  } = useFetch(`/feedback/todays-races/graph/by-race-id?race_id=${race_id}`);

  console.log(graphData);

  const [filter, setFilter] = useState("official_rating");

  if (graphDataLoading) {
    return <p>Loading data...</p>;
  }

  if (graphDataError) {
    return <p>Error fetching data: {graphDataError}</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4 pt-4">
        <label htmlFor="filter" className="mr-2 font-bold">
          Select Variable:
        </label>
        <select
          id="filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="p-2 border rounded-md"
        >
          <option value="official_rating">OR</option>
          <option value="rolling_rating">RATING</option>
          <option value="rolling_speed_rating">SPEED</option>
        </select>
      </div>
      <RaceGraph data={graphData} filter={filter} />
    </div>
  );
}
