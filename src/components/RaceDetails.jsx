import React, { useState } from "react";
import { HorseDetails } from "./HorseDetails";
import { PerformanceTable } from "./PerformanceTable";
import { DutchBetCalculator } from "./DutchBetCalculator";

export function RaceDetails({
  data,
  visibleHorses,
  setVisibleHorses,
  sortedHorses,
  resetVisibility,
}) {
  const [isAllNotVisible, setIsAllNotVisible] = useState(false);
  const [selectedHorses, setSelectedHorses] = useState([]);

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

  const handleHorseSelect = (horse) => {
    console.log("handleHorseSelect called with:", horse);
    if (!selectedHorses.find((h) => h.id === horse.horse_id)) {
      const newHorse = {
        id: horse.horse_id,
        name: horse.horse_name,
        odds: parseFloat(horse.todays_betfair_win_sp) || 2.0,
      };
      console.log("Adding new horse:", newHorse);
      setSelectedHorses((prevHorses) => [...prevHorses, newHorse]);
    }
  };

  const handleRemoveHorse = (horseId) => {
    setSelectedHorses((prevHorses) =>
      prevHorses.filter((horse) => horse.id !== horseId)
    );
  };

  console.log("Current selectedHorses:", selectedHorses);

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
                onHorseSelect={handleHorseSelect}
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
      <DutchBetCalculator
        selectedHorses={selectedHorses}
        onRemoveHorse={handleRemoveHorse}
      />
    </div>
  );
}
