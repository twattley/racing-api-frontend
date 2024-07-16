import { useParams } from "react-router-dom";
import { FeedbackRaceDetails } from "./FeedbackRaceDetails";
import { FeedbackRaceGraphs } from "./FeedbackRaceGraphs";
import { FeedbackTabs } from "../../components/feedback/Tabs";

export function FeedbackRaceWrapper() {
  const { race_id } = useParams();
  return (
    <div>
      <FeedbackTabs race_id={race_id} />{" "}
      <div className="flex h-screen">
        <div className="w-1/2 overflow-y-auto px-4 py-2 bg-white rounded-lg shadow">
          <FeedbackRaceDetails race_id={race_id} />
        </div>
        <div className="w-1/2 px-4 py-2 bg-white rounded-lg shadow sticky top-0 h-screen">
          <FeedbackRaceGraphs race_id={race_id} />
        </div>
      </div>
    </div>
  );
}
