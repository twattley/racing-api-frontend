import React from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { FeedbackTabs } from "../../components/feedback/Tabs";

export function FeedbackRaceResult() {
  const { race_id } = useParams();
  const {
    data: resultData,
    error: resultDataError,
    loading: resultDataLoading,
  } = useFetch(`/feedback/todays-races/result/by-race-id?race_id=${race_id}`);

  if (resultDataLoading) {
    return <p>Loading data...</p>;
  }

  if (resultDataError) {
    return <p>Error fetching data: {resultDataError.message}</p>;
  }

  if (!resultData || resultData.length === 0) {
    return <p>No data available.</p>;
  }

  const raceDetails = resultData[0];

  return (
    <div className="container mx-auto p-4">
      <FeedbackTabs race_id={race_id} />

      {raceDetails && (
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4 pt-4">Result</h1>
          <p>
            <strong>Course:</strong> {raceDetails.course}
          </p>
          <p>
            <strong>Distance:</strong> {raceDetails.distance}
          </p>
          <p>
            <strong>Going:</strong> {raceDetails.going}
          </p>
          <p>
            <strong>Race Class:</strong> {raceDetails.race_class}
          </p>
          <p>
            <strong>Conditions:</strong> {raceDetails.conditions}
          </p>
          <p>
            <strong>Race Title:</strong> {raceDetails.race_title}
          </p>
          <br />
          <hr />
          <br />
          <p>
            <strong>Race Comment:</strong>
          </p>
          <p>{raceDetails.main_race_comment}</p>
        </div>
      )}

      {raceDetails && raceDetails.race_results && (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-gray-800 text-white">
                <th className="px-3 py-2 text-left w-1/4">Horse Name</th>
                <th className="px-1 py-2 text-left w-1/7">SP</th>
                <th className="px-1 py-2 text-left w-1/8">Distance Beaten</th>
              </tr>
            </thead>
            <tbody>
              {raceDetails.race_results.map((result, index) => (
                <React.Fragment key={index}>
                  <tr className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}>
                    <td className="px-4 py-2">
                      <strong>{result.finishing_position}</strong>
                      {"  -  "}
                      {result.horse_name}
                    </td>
                    <td className="px-1 py-2">
                      <strong>{result.betfair_win_sp}</strong>
                    </td>
                    <td className="px-1 py-2">
                      {result.finishing_position !== 1 && (
                        <strong>{result.total_distance_beaten}</strong>
                      )}
                    </td>
                  </tr>
                  <tr className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}>
                    <td className="px-4 py-2" colSpan={3}>
                      {result.tf_comment}
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
