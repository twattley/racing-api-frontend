import React, { useState, useEffect } from "react";

export function RaceDetails({ formData, formDataError, formDataLoading }) {
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

  const [visibleHorses, setVisibleHorses] = useState({});

  useEffect(() => {
    if (formData && Array.isArray(formData.horse_data)) {
      const initialVisibility = formData.horse_data.reduce((acc, horse) => {
        console.log(horse.horse_id, horse.todays_betfair_place_sp, horse);
        acc[horse.horse_id] = !(
          horse.todays_betfair_win_sp > 20 || 
          horse.todays_days_since_last_ran > 100 || 
          horse.todays_days_since_last_ran < 7
        );
        return acc;
      }, {});
      setVisibleHorses(initialVisibility);
    }
  }, [formData]);


  const onSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedPerformances = (performances) => {
    if (sortConfig.key) {
      return [...performances].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return performances;
  };

  const toggleHorseVisibility = (horse_id) => {
    setVisibleHorses((prevState) => ({
      ...prevState,
      [horse_id]: !prevState[horse_id],
    }));
  };

  if (formDataLoading) {
    return <p>Loading data...</p>;
  }
  if (formDataError) {
    return <p>Error loading: {formDataError.message}</p>;
  }

  return (
    <div className="container mx-auto p-4">
      {formData && (
        <div className="mb-8">
          <p>
            <strong>Course:</strong> {formData.course}
          </p>
          <p>
            <strong>Race Title:</strong> {formData.race_title}
          </p>
          <p>
            <strong>Distance:</strong> {formData.distance}
          </p>
          <p>
            <strong>Going:</strong> {formData.going}
          </p>
          <p>
            <strong>Race Class:</strong> {formData.race_class}
          </p>
          <p>
            <strong>Conditions:</strong> {formData.conditions}
          </p>
        </div>
      )}
      {formData &&
        formData.horse_data.map((horse) => (
          <div key={horse.horse_id} className="mb-8">
            <h2
              className="text-2xl pt-4 font-bold mb-4 cursor-pointer"
              onClick={() => toggleHorseVisibility(horse.horse_id)}
            >
              <span className="border border-gray-300 px-2 py-1 rounded ml-2">
                {horse.horse_name} {'-'} {horse.todays_horse_age} {" ("} {horse.todays_official_rating} {")"}
              </span>
              <span className="bg-blue-200 px-2 py-1 rounded ml-2">
                {horse.todays_betfair_win_sp}
              </span>
              <span className="bg-blue-200 px-2 py-1 rounded ml-1">
                {horse.todays_betfair_place_sp}
              </span>
              <span className="bg-green-400 text-black px-2 py-1 rounded ml-2">
                {horse.first_places}
              </span>
              <span className="bg-green-300 text-black px-2 py-1 rounded ml-2">
                {horse.second_places}
              </span>
              <span className="bg-green-200 text-black px-2 py-1 rounded ml-2">
                {horse.third_places}
              </span>
              <span className="bg-black text-white px-2 py-1 rounded ml-2">
                {horse.number_of_runs}
              </span>
            </h2>
            {visibleHorses[horse.horse_id] && (
              <div className="overflow-y-auto" style={{ maxHeight: "640px" }}>
                <table className="min-w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-800 text-white">
                      <th className="px-4 py-2 text-left cursor-pointer">
                        PERFORMANCE
                      </th>
                      <th className="px-4 py-2 text-left cursor-pointer">
                        DSP/DSLR
                      </th>
                      <th className="px-4 py-2 text-left cursor-pointer">OR</th>
                      <th className="px-4 py-2 text-left cursor-pointer">
                        RP-RATINGS
                      </th>
                      <th className="px-4 py-2 text-left cursor-pointer">
                        TF-RATINGS
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedPerformances(horse.performance_data).map(
                      (performance_data, index) => (
                        <React.Fragment key={performance_data.unique_id}>
                          <tr
                            className={
                              index % 2 === 0 ? "bg-white" : "bg-gray-100"
                            }
                          >
                            <td colSpan="11" className="px-4 py-2 text-xl">
                              <strong>{performance_data.course}</strong> {"  "}
                              <strong>{performance_data.distance}</strong>
                              {"  ("}
                              <strong>
                                <i>
                                  {"Class "}
                                  {performance_data.race_class}
                                </i>
                              </strong>
                              {")"}
                              {"  ("}
                              <strong>
                                <i>{performance_data.going}</i>
                              </strong>
                              {")"}
                              {"  ("}
                              <strong>
                                <i>
                                  {performance_data.total_prize_money}
                                  {"K"}
                                </i>
                              </strong>
                              {")"}
                              {" - "}
                              <span className="text-sm text-gray-500">
                                {"("}
                                {performance_data.race_type}
                                {")  "}
                              </span>
                              <span className="text-sm text-gray-500">
                                {performance_data.race_title}
                              </span>
                            </td>
                          </tr>
                          <tr
                            className={
                              index % 2 === 0 ? "bg-white" : "bg-gray-100"
                            }
                          >
                            <td className="px-4 py-2 text-xl">
                              {"   "}
                              <strong>
                                {performance_data.finishing_position}
                              </strong>{" "}
                              {"/"}{" "}
                              <strong>
                                {performance_data.number_of_runners}
                              </strong>
                              {"  ("}
                              <i>{performance_data.total_distance_beaten}</i>
                              {")"}
                              <span className="bg-blue-200 px-2 py-2 rounded ml-2">
                                {performance_data.betfair_win_sp}
                              </span>
                              <span className="bg-blue-200 px-2 py-2 rounded ml-2">
                                {performance_data.betfair_place_sp}
                              </span>
                            </td>

                            <td className="px-4 py-2">
                              {performance_data.days_since_performance} {"/ "}
                              {performance_data.days_since_last_ran}
                            </td>
                            <td className="px-4 py-2">
                              {performance_data.official_rating}
                            </td>
                            <td className="px-4 py-2">
                              {performance_data.ts} {"/ "}
                              {performance_data.rpr}
                            </td>
                            <td className="px-4 py-2">
                              {performance_data.tfig} {"/ "}
                              {performance_data.tfr}
                            </td>
                          </tr>
                          <tr
                            className={
                              index % 2 === 0 ? "bg-white" : "bg-gray-100"
                            }
                          >
                            <td className="px-4 py-2" colSpan={5}>
                              {performance_data.main_race_comment}
                            </td>
                          </tr>
                          <tr
                            className={
                              index % 2 === 0 ? "bg-white" : "bg-gray-100"
                            }
                          >
                            <td className="px-4 py-2" colSpan={5}>
                              {performance_data.tf_comment}
                            </td>
                          </tr>
                        </React.Fragment>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ))}
    </div>
  );
}
