import React, { useState } from "react";
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

  const toggleHorseVisibility = (horse_id) => {
    setVisibleHorses((prevState) => ({
      ...prevState,
      [horse_id]: !prevState[horse_id],
    }));
  };

  const handleToggleVisibility = () => {
    if (isAllNotVisible) {
      resetVisibility();
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

  return (
    <div className="container mx-auto p-4">
      <button
        onClick={handleToggleVisibility}
        className="mb-4 px-6 py-2 bg-gray-300 text-black rounded text-xl"
      >
        {isAllNotVisible ? "Market" : "Filtered"}
      </button>
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
