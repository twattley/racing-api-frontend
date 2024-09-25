import React from "react";
import { usePost } from "../hooks/usePost";

// Generic Button Component
function GenericButton({ betType, isSelected, onClick, children }) {
  const baseClasses = "px-3 py-1 text-sm rounded";
  const colorClasses = isSelected
    ? betType.startsWith("back")
      ? "bg-green-500 text-white"
      : "bg-red-500 text-white"
    : "bg-gray-200 text-gray-700";

  return (
    <button onClick={onClick} className={`${baseClasses} ${colorClasses}`}>
      {children}
    </button>
  );
}

// Betting Button Component
function BettingButton({
  horse,
  selectedHorses,
  onSelectionChange,
  betType,
  label,
}) {
  const isSelected = selectedHorses.some(
    (h) => h.horse_id === horse.horse_id && h.bet_type === betType
  );

  return (
    <GenericButton
      betType={betType}
      isSelected={isSelected}
      onClick={() => onSelectionChange(horse.horse_id, betType)}
    >
      {label}
    </GenericButton>
  );
}

// Define bet types
const betTypes = [
  { type: "back_mid_price", label: "Back Mid Price" },
  { type: "back_outsider", label: "Back Outsider" },
  { type: "back_outsider_place", label: "Back Outsider Place" },
  { type: "lay_favourite", label: "Lay Favourite" },
  { type: "lay_mid_price_place", label: "Lay Mid Price Place" },
  { type: "dutch_back", label: "Dutch Back" },
  { type: "dutch_lay", label: "Dutch Lay" },
];

export function HorseSelectionPanel({
  horses,
  selectedHorses,
  onSelectionChange,
  raceDate,
  raceId,
}) {
  const { data, error, loading, postData } = usePost(`/betting/selections`);

  const submitSelections = async () => {
    const selectionsData = {
      race_date: raceDate,
      race_id: raceId,
      selections: selectedHorses.map((selection) => ({
        horse_id: parseInt(selection.horse_id),
        bet_type: selection.bet_type,
      })),
    };

    console.log("Sending data:", JSON.stringify(selectionsData, null, 2));

    try {
      const result = await postData(selectionsData);
      console.log("Submission result:", result);
      alert("All selections submitted successfully!");
    } catch (error) {
      console.error("Error submitting selections:", error);
      alert("There was an error submitting selections. Please try again.");
    }
  };

  return (
    <div className="mt-8 p-4 border rounded-lg bg-gray-100">
      <h3 className="text-lg font-bold mb-2">Select Horses for Betting</h3>
      <p className="text-sm text-gray-600 mb-2">Race Date: {raceDate}</p>
      <div className="space-y-4">
        {horses.map((horse) => (
          <div
            key={horse.horse_id}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-2 border rounded"
          >
            <span className="text-sm font-medium mb-2 sm:mb-0">
              {horse.horse_name}
            </span>
            <div className="flex flex-wrap gap-2">
              {betTypes.map((bet) => (
                <BettingButton
                  key={bet.type}
                  horse={horse}
                  selectedHorses={selectedHorses}
                  onSelectionChange={onSelectionChange}
                  betType={bet.type}
                  label={bet.label}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={submitSelections}
        disabled={loading}
        className={`mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {loading ? "Submitting..." : "Submit Selections"}
      </button>
      {error && <p className="text-red-500 mt-2">Error: {error.message}</p>}
      {data && (
        <p className="text-green-500 mt-2">
          Selections submitted successfully!
        </p>
      )}
    </div>
  );
}
