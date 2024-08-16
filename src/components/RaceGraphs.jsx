import React, { useState, useEffect } from "react";
import { Graph } from "./Graph";

export function RaceGraphs({ data, visibleHorses, selectedGraphHorse }) {
  const [filter, setFilter] = useState("rating");

  useEffect(() => {
    console.log("Selected Horse in RaceGraphs:", selectedGraphHorse);
  }, [selectedGraphHorse]);

  if (!data) {
    return <p>Loading data...</p>;
  }

  const handleFilterChange = (event) => {
    const { name, checked } = event.target;
    if (checked) {
      setFilter(name);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4 pt-4 flex">
        <div className="flex flex-col space-y-2 mr-8">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="official_rating"
              checked={filter === "official_rating"}
              onChange={handleFilterChange}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span className="ml-2">OFFICIAL RATING</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="rating"
              checked={filter === "rating"}
              onChange={handleFilterChange}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span className="ml-2">RATING</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="speed_figure"
              checked={filter === "speed_figure"}
              onChange={handleFilterChange}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span className="ml-2">SPEED</span>
          </label>
        </div>
      </div>
      <Graph
        data={data}
        filter={filter}
        visibleHorses={visibleHorses}
        selectedHorse={selectedGraphHorse}
      />
    </div>
  );
}
