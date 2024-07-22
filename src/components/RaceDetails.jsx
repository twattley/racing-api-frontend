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
      {data && (
        <div className="grid grid-cols-[200px,80px,150px,80px,140px,80px,80px] gap-2 mb-4 sticky top-0 z-10 bg-white shadow-md p-2 pl-6">
          <span className="border border-gray-300 px-2 py-1 rounded">
            <b>{data.course}</b>
          </span>
          <span className="border border-gray-300 px-2 py-1 rounded">
            {data.distance}
          </span>
          <span className="border border-gray-300 px-2 py-1 rounded">
            {data.going}
          </span>
          <span className="border border-gray-300 px-2 py-1 rounded">
            {data.race_class}
          </span>
          <span className="border border-gray-300 px-2 py-1 rounded">
            {data.conditions}
          </span>
          <span className="border border-gray-300 px-2 py-1 rounded">
            {data.total_prize_money}
          </span>

          {/* Add more grid items as needed, similar to the above pattern */}
          <span className="border border-gray-300 px-2 py-1 rounded">
            {data.race_type} {/* New Grid Item: Race Type */}
          </span>
        </div>
      )}
      {sortedHorses.length > 0 && (
        <div className="mb-4 p-2">
          {sortedHorses.map((horse) => (
            <React.Fragment key={horse.horse_id}>
              <HorseDetails
                horse={horse}
                toggleHorseVisibility={toggleHorseVisibility}
                visibleHorses={visibleHorses}
              />
              <PerformanceTable horse={horse} visibleHorses={visibleHorses} />
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
}
