import React, { useState, useEffect } from "react";
import { HorseDetails } from "./HorseDetails";
import { PerformanceTable } from "./PerformanceTable";

export function RaceDetails({
  data,
  visibleHorses,
  setVisibleHorses,
  sortedHorses,
  resetVisibility,
}) {
  const [isAllNotVisible, setIsAllNotVisible] = useState(false);
  const [filters, setFilters] = useState({
    outsiders: true,
    longBreak: true,
    shortBreak: true,
    figureVisibility: true,
    varianceVisibility: true,
  });

  const toggleHorseVisibility = (horse_id) => {
    setVisibleHorses((prevState) => ({
      ...prevState,
      [horse_id]: !prevState[horse_id],
    }));
  };

  const handleToggleVisibility = () => {
    if (isAllNotVisible) {
      resetVisibility(filters);
    } else {
      const allNotVisible = Object.keys(visibleHorses).reduce(
        (acc, horse_id) => {
          acc[horse_id] = false;
          return acc;
        },
        {}
      );
      setVisibleHorses(allNotVisible);
    }
    setIsAllNotVisible(!isAllNotVisible);
  };

  const handleFilterChange = (filter) => {
    const newFilters = {
      ...filters,
      [filter]: !filters[filter],
    };
    setFilters(newFilters);
    resetVisibility(newFilters);
  };

  useEffect(() => {
    resetVisibility(filters);
  }, [filters]);

  return (
    <div className="container mx-auto p-4">
      <button
        onClick={handleToggleVisibility}
        className="mb-4 px-6 py-2 bg-gray-300 text-black rounded text-xl"
      >
        {isAllNotVisible ? "Market" : "Filtered"}
      </button>
      <div className="mb-4">
        <button
          onClick={() => handleFilterChange("outsiders")}
          className={`px-4 py-2 mr-2 ${
            filters.outsiders ? "bg-blue-500" : "bg-gray-300"
          } text-white rounded`}
        >
          Outsiders
        </button>
        <button
          onClick={() => handleFilterChange("longBreak")}
          className={`px-4 py-2 mr-2 ${
            filters.longBreak ? "bg-blue-500" : "bg-gray-300"
          } text-white rounded`}
        >
          Long Break
        </button>
        <button
          onClick={() => handleFilterChange("shortBreak")}
          className={`px-4 py-2 mr-2 ${
            filters.shortBreak ? "bg-blue-500" : "bg-gray-300"
          } text-white rounded`}
        >
          Short Break
        </button>
        <button
          onClick={() => handleFilterChange("figureVisibility")}
          className={`px-4 py-2 mr-2 ${
            filters.figureVisibility ? "bg-blue-500" : "bg-gray-300"
          } text-white rounded`}
        >
          Figure Visibility
        </button>
        <button
          onClick={() => handleFilterChange("varianceVisibility")}
          className={`px-4 py-2 ${
            filters.varianceVisibility ? "bg-blue-500" : "bg-gray-300"
          } text-white rounded`}
        >
          Variance Visibility
        </button>
      </div>
      {sortedHorses.length > 0 && (
        <div className="mb-4 p-2">
          {sortedHorses.map((horse) => (
            <React.Fragment key={horse.horse_id}>
              <HorseDetails
                horse={horse}
                toggleHorseVisibility={toggleHorseVisibility}
                visibleHorses={visibleHorses}
              />
              <PerformanceTable
                horse={horse}
                visibleHorses={visibleHorses}
                data={data}
              />
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
}
