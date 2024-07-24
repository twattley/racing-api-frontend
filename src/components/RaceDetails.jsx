import React from "react";
import { HorseDetails } from "./HorseDetails";
import { PerformanceTable } from "./PerformanceTable";

export function RaceDetails({
  data,
  visibleHorses,
  setVisibleHorses,
  sortedHorses,
}) {
  const toggleHorseVisibility = (horse_id) => {
    setVisibleHorses((prevState) => ({
      ...prevState,
      [horse_id]: !prevState[horse_id],
    }));
  };

  return (
    <div className="container mx-auto p-4">
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
