import React, { useState, useEffect } from "react";
import { HorseDetails } from "./HorseDetails";
import { PerformanceTable } from "./PerformanceTable";
import { DutchBetCalculator } from "./DutchBetCalculator";

export function RaceDetails({
  data,
  visibleHorses,
  setVisibleHorses,
  sortedHorses,
  resetVisibility,
  onGraphHorseSelect,
}) {
  const [isAllNotVisible, setIsAllNotVisible] = useState(false);
  const [selectedHorses, setSelectedHorses] = useState([]);
  const [timeToOff, setTimeToOff] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const raceTime = new Date(data.race_time);
      const diff = raceTime - now;

      if (diff > 0) {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeToOff(
          `${hours.toString().padStart(2, "0")}:${minutes
            .toString()
            .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
        );
      } else {
        setTimeToOff("Historical data");
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [data.race_time]);

  const toggleHorseVisibility = (horse_id) => {
    console.log("toggleHorseVisibility called with:", horse_id);
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

  const handleDutchHorseSelect = (horse) => {
    console.log("handleDutchHorseSelect called with:", horse);
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

  return (
    <div className="container mx-auto p-4">
      <button
        onClick={handleToggleVisibility}
        className="mb-4 px-6 py-2 bg-gray-300 text-black rounded text-xl"
      >
        {isAllNotVisible ? "Market" : "Filtered"}
      </button>
      <h1 className="text-2xl font-bold">
        {(() => {
          const raceDate = new Date(data.race_time);
          const raceTime = raceDate.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });
          return `${raceTime} (${timeToOff})`;
        })()}
      </h1>
      {sortedHorses.length > 0 && (
        <div className="mb-4 p-2">
          {sortedHorses.map((horse) => (
            <React.Fragment key={horse.horse_id}>
              <HorseDetails
                horse={horse}
                toggleHorseVisibility={toggleHorseVisibility}
                visibleHorses={visibleHorses}
                dutchHorseSelect={handleDutchHorseSelect}
                graphHorseSelect={onGraphHorseSelect}
              />
              <PerformanceTable
                horse={horse}
                visibleHorses={visibleHorses}
                data={data}
                todaysRaceDate={data.race_date}
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
