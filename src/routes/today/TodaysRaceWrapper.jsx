import React from "react";
import { useParams } from "react-router-dom";
import { useRaceData } from "../../hooks/useRaceData";
import { RaceDetails } from "../../components/RaceDetails";
import { RaceGraphs } from "../../components/RaceGraphs";

export function TodaysRaceWrapper() {
  const { race_id } = useParams();
  const {
    raceData,
    raceDataError,
    raceDataLoading,
    visibleHorses,
    setVisibleHorses,
    sortedHorses,
  } = useRaceData(`/today/todays-races/by-race-id?race_id=${race_id}`);

  if (raceDataLoading) {
    return <p>Loading data...</p>;
  }

  if (raceDataError) {
    return <p>Error fetching data: {raceDataError}</p>;
  }

  return (
    <div>
      <div className="flex h-screen">
        <div className="w-1/2 overflow-y-auto px-4 py-2 bg-white rounded-lg shadow">
          <RaceDetails
            race_id={race_id}
            data={raceData}
            visibleHorses={visibleHorses}
            setVisibleHorses={setVisibleHorses}
            sortedHorses={sortedHorses}
          />
        </div>
        <div className="w-1/2 px-4 py-2 bg-white rounded-lg shadow sticky top-0 h-screen">
          <RaceGraphs
            race_id={race_id}
            data={raceData}
            visibleHorses={visibleHorses}
            setVisibleHorses={setVisibleHorses}
          />
        </div>
      </div>
    </div>
  );
}
