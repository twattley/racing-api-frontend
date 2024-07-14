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
        <div className="sticky top-0 z-10 bg-white shadow-md mb-4 p-2 flex gap-2 flex-wrap">
          <div>
            <strong>
              <p className="pl-2 py-2 text-xl">{formData.course}</p>
            </strong>
          </div>
          <div>
            <strong>
              <p className="py-2 text-xl">{formData.distance}</p>
            </strong>
          </div>
          <div>
            <strong>
              <p className="py-2 text-xl">
                {"(Class "}
                <i>{formData.race_class}</i>
                {")"}
              </p>
            </strong>
          </div>
          <div>
            <strong>
              <p className="py-2 text-xl">{formData.conditions}</p>
            </strong>
          </div>
          <div>
            <strong>
              <p className="py-2 text-xl">
                <i>
                  {"("} {formData.going} {")"}
                </i>
              </p>
            </strong>
          </div>
          <div>
            <strong>
              <p className="py-2 text-xl">{formData.total_prize_money}</p>
            </strong>
          </div>
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
                {horse.horse_name} {"-"} {horse.todays_horse_age} {" ("}{" "}
                {horse.todays_official_rating} {")"}
              </span>
              <span className="bg-blue-200 px-2 py-1 rounded ml-2">
                {horse.todays_betfair_win_sp}
              </span>
              <span className="bg-blue-200 px-2 py-1 rounded ml-1">
                {horse.todays_betfair_place_sp}
              </span>
              <span className="bg-green-400 text-black px-2 py-1 rounded ml-2">
                {horse.todays_first_places}
              </span>
              <span className="bg-green-300 text-black px-2 py-1 rounded ml-2">
                {horse.todays_second_places}
              </span>
              <span className="bg-green-200 text-black px-2 py-1 rounded ml-2">
                {horse.todays_third_places}
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
                        BTN
                      </th>
                      <th className="px-4 py-2 text-left cursor-pointer">
                        WIN/PLACE
                      </th>
                      <th className="px-4 py-2 text-left cursor-pointer">
                        IP HI/LOW
                      </th>
                      <th className="px-4 py-2 text-left cursor-pointer">
                        DSP/DSLR
                      </th>
                      <th className="px-4 py-2 text-left cursor-pointer">OR</th>
                      <th className="px-4 py-2 text-left cursor-pointer">
                        SPEED-RATINGS
                      </th>
                      <th className="px-4 py-2 text-left cursor-pointer">
                        RATINGS
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
                              {""}
                              <strong>
                                <i>{performance_data.conditions}</i>
                              </strong>
                              {" ("}
                              <strong>
                                <i> {performance_data.going}</i>
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
                              <span className="text-sm text-gray-500">
                                {"("}
                                {performance_data.draw}
                                {")  "}
                              </span>{" "}
                              <strong>
                                {performance_data.finishing_position}
                              </strong>{" "}
                              {"/"}{" "}
                              <strong>
                                {performance_data.number_of_runners}
                              </strong>
                            </td>
                            <td className="px-4 py-2">
                              <strong
                                className={`
                                          ${
                                            performance_data.total_distance_beaten >
                                            4
                                              ? "text-red-400"
                                              : ""
                                          } 
                                          ${
                                            performance_data.total_distance_beaten >
                                              0 &&
                                            performance_data.total_distance_beaten <
                                              4
                                              ? "text-blue-400"
                                              : ""
                                          }
                                          ${
                                            performance_data.total_distance_beaten <=
                                            0
                                              ? "text-green-400"
                                              : ""
                                          }
                                      `}
                              >
                                {"  ("}
                                <i>{performance_data.total_distance_beaten}</i>
                                {")"}
                              </strong>
                            </td>

                            <td>
                              <span className="bg-blue-200 px-2 py-2 rounded ml-2">
                                {performance_data.betfair_win_sp}
                              </span>
                              <span className="bg-blue-200 px-2 py-2 rounded ml-2">
                                {performance_data.betfair_place_sp}
                              </span>
                            </td>
                            <td className="px-4 py-2">
                              <span
                                className={`
                                  px-2 py-2 rounded ml-2 
                                  ${
                                    performance_data.in_play_high === null
                                      ? "bg-red-200"
                                      : "bg-green-200"
                                  }
                                `}
                              >
                                {performance_data.in_play_high ??
                                  performance_data.in_play_low}
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
                              {performance_data.speed_figure}
                              {performance_data.speed_rating_diff !== 0 && (
                                <span
                                  className={
                                    performance_data.speed_rating_diff > 0
                                      ? "text-green-500"
                                      : "text-red-500"
                                  }
                                >
                                  {" ("}
                                  <i>{performance_data.speed_rating_diff}</i>
                                  {")"}
                                </span>
                              )}
                            </td>
                            <td className="px-4 py-2">
                              {performance_data.rating}
                              {performance_data.rating_diff !== 0 && (
                                <span
                                  className={
                                    performance_data.rating_diff > 0
                                      ? "text-green-500"
                                      : "text-red-500"
                                  }
                                >
                                  {" ("}
                                  <i>{performance_data.rating_diff}</i>
                                  {")"}
                                </span>
                              )}
                            </td>
                          </tr>
                          <tr
                            className={
                              index % 2 === 0 ? "bg-white" : "bg-gray-100"
                            }
                          >
                            <td className="px-4 py-2" colSpan={8}>
                              {performance_data.main_race_comment}
                            </td>
                          </tr>
                          <tr
                            className={
                              index % 2 === 0 ? "bg-white" : "bg-gray-100"
                            }
                          >
                            <td className="px-4 py-2" colSpan={8}>
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
