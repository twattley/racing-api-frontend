import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { TodaysTabs } from "../../components/today/Tabs";
import { RaceGraph } from "../../components/Graph";

export function TodaysRaceGraphs() {
  const { race_id } = useParams();
  const {
    data: graphData,
    error: graphDataError,
    loading: graphDataLoading,
  } = useFetch(`/today/todays-races/graph/by-race-id?race_id=${race_id}`);

  const [filter, setFilter] = useState("official_rating");

  if (graphDataLoading) {
    return <p>Loading data...</p>;
  }

  if (graphDataError) {
    return <p>Error fetching data: {graphDataError}</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <TodaysTabs race_id={race_id} />
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
          <option value="official_rating">Official Rating</option>
          <option value="rpr">RPR</option>
          <option value="ts">TS</option>
          <option value="tfr">TFR</option>
          <option value="tfig">TFIG</option>
        </select>
      </div>
      <RaceGraph data={graphData} filter={filter} />
    </div>
  );
}
