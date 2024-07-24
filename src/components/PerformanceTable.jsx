import React from "react";

export function PerformanceTable({ horse, visibleHorses, data }) {
  return (
    visibleHorses[horse.horse_id] && (
      <div className="overflow-y-auto" style={{ maxHeight: "640px" }}>
        <table className="min-w-full border-collapse">
          <thead className="sticky top-0 z-10 bg-gray-800">
            <tr className="bg-gray-800 text-white">
              <td colSpan="7" className="px-4 py-2">
                <div className="grid grid-cols-[200px,150px,180px,80px,140px,80px,80px] gap-2">
                  <span className="border border-gray-300 px-2 py-1 rounded text-xl">
                    {data.course}
                  </span>
                  <span className="border border-gray-300 px-2 py-1 rounded text-xl">
                    {data.distance}
                  </span>
                  <span className="border border-gray-300 px-2 py-1 rounded text-xl">
                    {data.going}
                  </span>
                  <span className="border border-gray-300 px-2 py-1 rounded text-xl">
                    {data.race_class}
                  </span>
                  <span className="border border-gray-300 px-2 py-1 rounded text-xl">
                    {data.conditions}
                  </span>
                  <span className="border border-gray-300 px-2 py-1 rounded text-xl">
                    {data.first_place_prize_money}
                  </span>
                  <span className="border border-gray-300 px-2 py-1 rounded text-xl">
                    {data.race_type}
                  </span>
                </div>
              </td>
            </tr>
          </thead>
          <tbody>
            {horse.performance_data
              .filter(
                (performance_data) => performance_data.data_type !== "today"
              )
              .map((performance_data, index) => (
                <React.Fragment key={performance_data.unique_id}>
                  <tr className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}>
                    <td colSpan="11" className="px-4 py-2 text-xl">
                      <div className="grid grid-cols-[200px,150px,180px,80px,140px,80px,80px] gap-2">
                        <span className="border border-gray-300 px-2 py-1 rounded">
                          {performance_data.course}
                        </span>
                        <span className="border border-gray-300 px-2 py-1 rounded">
                          {performance_data.distance}
                        </span>
                        <span className="border border-gray-300 px-2 py-1 rounded">
                          {performance_data.going}
                        </span>
                        <span className="border border-gray-300 px-2 py-1 rounded">
                          {performance_data.race_class}
                        </span>
                        <span className=" text-md border border-gray-300 px-2 py-1 rounded">
                          {performance_data.conditions}
                        </span>
                        <span className="border border-gray-300 px-2 py-1 rounded">
                          {performance_data.first_place_prize_money}
                        </span>
                        <span className="border border-gray-300 px-2 py-1 rounded">
                          {performance_data.race_type}
                        </span>
                      </div>
                    </td>
                  </tr>
                  <tr className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}>
                    <td colSpan="11" className="px-4 py-2 text-xl">
                      <div className="grid grid-cols-[60px,80px,80px,80px,80px,100px,100px,1fr,100px,100px] gap-2">
                        <span className="border border-gray-300 px-2 py-1 rounded">
                          ({performance_data.draw})
                        </span>
                        <span className="border border-gray-300 px-2 py-1 rounded">
                          {performance_data.finishing_position} /{" "}
                          {performance_data.number_of_runners}{" "}
                        </span>
                        <span className="border border-gray-300 px-2 py-1 rounded">
                          <span
                            className={`
                            ${
                              performance_data.total_distance_beaten > 4
                                ? "text-red-400"
                                : ""
                            }
                            ${
                              performance_data.total_distance_beaten > 0 &&
                              performance_data.total_distance_beaten < 4
                                ? "text-blue-400"
                                : ""
                            }
                            ${
                              performance_data.total_distance_beaten <= 0
                                ? "text-green-400"
                                : ""
                            }
                          `}
                          >
                            ({performance_data.total_distance_beaten})
                          </span>
                        </span>
                        <span className="bg-blue-200 px-2 py-1 rounded">
                          {performance_data.betfair_win_sp}
                        </span>
                        <span className="bg-blue-200 px-2 py-1 rounded">
                          {performance_data.betfair_place_sp}
                        </span>
                        <span className="border border-gray-300 px-2 py-1 rounded">
                          {performance_data.days_since_performance}{" "}
                          <span className="text-gray-400 text-sm">(dsp)</span>
                        </span>
                        <span className="border border-gray-300 px-2 py-1 rounded">
                          {performance_data.days_since_last_ran}{" "}
                          <span className="text-gray-400 text-sm">(dslr)</span>
                        </span>
                        <div></div> {/* This creates the gap */}
                        <span className="border border-gray-300 px-2 py-1 rounded">
                          <b>{performance_data.speed_figure}</b>
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
                        </span>
                        <span className="border border-gray-300 px-2 py-1 rounded">
                          <b>{performance_data.rating}</b>
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
                        </span>
                      </div>
                    </td>
                  </tr>
                  <tr className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}>
                    <td className="px-4 py-2" colSpan={8}>
                      {performance_data.main_race_comment}
                    </td>
                  </tr>
                  <tr className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}>
                    <td className="px-4 py-2" colSpan={8}>
                      {performance_data.tf_comment}
                    </td>
                  </tr>
                </React.Fragment>
              ))}
          </tbody>
        </table>
      </div>
    )
  );
}
