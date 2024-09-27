import React, { useState, useMemo } from "react";
import { useFetch } from "../../hooks/useFetch";
import { BettingResultsGraph } from "../../components/BettingResultsGraph";

// Predefined options for number of runners
const runnerOptions = [
  { value: "all", label: "All" },
  { value: "1-5", label: "1-5 runners" },
  { value: "6-10", label: "6-10 runners" },
  { value: "11-15", label: "11-15 runners" },
  { value: "16+", label: "16+ runners" },
];

export function BettingResults() {
  const {
    data: bettingResultsData,
    error: bettingResultsError,
    loading: bettingResultsLoading,
  } = useFetch("/betting/selections_analysis");

  const [selectedRunners, setSelectedRunners] = useState("all");

  const filteredData = useMemo(() => {
    if (!bettingResultsData || !bettingResultsData.result_dict) return [];
    if (selectedRunners === "all") return bettingResultsData.result_dict;

    const [min, max] = selectedRunners.split("-").map(Number);
    return bettingResultsData.result_dict.filter((item) => {
      if (max) {
        return item.number_of_runners >= min && item.number_of_runners <= max;
      } else {
        return item.number_of_runners >= min;
      }
    });
  }, [bettingResultsData, selectedRunners]);

  if (bettingResultsLoading) return <div>Loading...</div>;
  if (bettingResultsError)
    return <div>Error: {bettingResultsError.message}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Betting Results</h1>
      <div className="mb-4">
        <h2>Number of Bets: {bettingResultsData?.number_of_bets}</h2>
        <h2>Overall Total: {bettingResultsData?.overall_total.toFixed(2)}</h2>
      </div>
      <div className="mb-4">
        <label htmlFor="runners" className="mr-2">
          Filter by number of runners:
        </label>
        <select
          id="runners"
          value={selectedRunners}
          onChange={(e) => setSelectedRunners(e.target.value)}
          className="border rounded p-1"
        >
          {runnerOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      {filteredData.length > 0 ? (
        <BettingResultsGraph
          bettingResultsData={filteredData}
          overallTotal={bettingResultsData?.overall_total}
        />
      ) : (
        <p>No data available for the selected filter.</p>
      )}
    </div>
  );
}
