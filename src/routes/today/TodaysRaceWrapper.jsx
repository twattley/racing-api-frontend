import { useParams } from "react-router-dom";
import { TodaysRaceDetails } from "./TodaysRaceDetails";
import { TodaysRaceGraphs } from "./TodaysRaceGraphs";

export function TodaysRaceWrapper() {
  const { race_id } = useParams();
  return (
    <div>
      <div className="flex h-screen">
        <div className="w-1/2 overflow-y-auto px-4 py-2 bg-white rounded-lg shadow">
          <TodaysRaceDetails race_id={race_id} />
        </div>
        <div className="w-1/2 px-4 py-2 bg-white rounded-lg shadow sticky top-0 h-screen">
          <TodaysRaceGraphs race_id={race_id} />
        </div>
      </div>
    </div>
  );
}
