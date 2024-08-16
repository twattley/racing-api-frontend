import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useRaceData } from "../../hooks/useRaceData";
import { RaceDetails } from "../../components/RaceDetails";
import { RaceGraphs } from "../../components/RaceGraphs";
import { FeedbackTabs } from "../../components/feedback/Tabs";

export function FeedbackRaceWrapper() {
  const { race_id } = useParams();
  const {
    raceData,
    raceDataError,
    raceDataLoading,
    visibleHorses,
    setVisibleHorses,
    sortedHorses,
    resetVisibility,
  } = useRaceData(`/feedback/todays-races/by-race-id?race_id=${race_id}`);

  const [selectedGraphHorse, setSelectedGraphHorse] = useState(null);

  const handleGraphHorseSelect = (horse) => {
    setSelectedGraphHorse(horse);
    console.log("Graph horse selected:", horse.horse_name);
  };

  if (raceDataLoading) {
    return <p>Loading data...</p>;
  }

  if (raceDataError) {
    return <p>Error fetching data: {raceDataError}</p>;
  }

  return (
    <div>
      <FeedbackTabs race_id={race_id} />
      <div className="flex h-screen">
        <div className="w-1/2 overflow-y-auto px-4 py-2 bg-white rounded-lg shadow">
          <RaceDetails
            race_id={race_id}
            data={raceData}
            visibleHorses={visibleHorses}
            setVisibleHorses={setVisibleHorses}
            sortedHorses={sortedHorses}
            resetVisibility={resetVisibility}
            onGraphHorseSelect={handleGraphHorseSelect}
          />
        </div>
        <div className="w-1/2 px-4 py-2 bg-white rounded-lg overflow-y-auto">
          <RaceGraphs
            race_id={race_id}
            data={raceData}
            visibleHorses={visibleHorses}
            setVisibleHorses={setVisibleHorses}
            selectedGraphHorse={selectedGraphHorse}
          />
        </div>
      </div>
    </div>
  );
}
