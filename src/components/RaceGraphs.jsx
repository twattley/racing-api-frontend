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
        <div>
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
