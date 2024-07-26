import React, { useState } from "react";
import { Graph } from "./Graph";

export function RaceGraphs({ data, visibleHorses }) {
  const [filter, setFilter] = useState("rating");
  const [selectedHorseId, setSelectedHorseId] = useState(null);

  if (!data) {
    return <p>Loading data...</p>;
  }

  const selectedHorse = data.horse_data.find(
    (horse) => horse.horse_id === selectedHorseId
  );

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
          <option value="official_rating">OFFICIAL RATING</option>
          <option value="rating">RATING</option>
          <option value="speed_figure">SPEED</option>
        </select>
      </div>
      <div className="mb-4 pt-4">
        <label htmlFor="horse" className="mr-2 font-bold">
          Select Horse:
        </label>
        <select
          id="horse"
          value={selectedHorseId || ""}
          onChange={(e) => setSelectedHorseId(parseInt(e.target.value, 10))}
          className="p-2 border rounded-md"
        >
          <option value="" disabled>
            Select a horse
          </option>
          {data.horse_data.map((horse) => (
            <option key={horse.horse_id} value={horse.horse_id}>
              {horse.horse_name}
            </option>
          ))}
        </select>
      </div>
      <Graph
        data={data}
        filter={filter}
        visibleHorses={visibleHorses}
        selectedHorse={selectedHorse}
      />
    </div>
  );
}
