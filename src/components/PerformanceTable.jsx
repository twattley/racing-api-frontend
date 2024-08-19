import React, { useState, useEffect, useRef } from "react";
import { useFetch } from "../hooks/useFetch";
import { RacePopup } from "./RacePopup";

const getSurfaceColorClass = (surface) => {
  const normalizedSurface = surface.trim().toLowerCase();
  switch (normalizedSurface) {
    case "turf":
      return "bg-green-500";
    case "polytrack":
      return "bg-brown-700";
    case "tapeta":
      return "bg-brown-300";
    case "fibresand":
      return "bg-yellow-700";
    case "artificial":
      return "bg-yellow-300";
    default:
      console.log(`Unknown surface: ${surface}`);
      return "";
  }
};

export function PerformanceTable({
  horse,
  visibleHorses,
  data,
  todaysRaceDate,
}) {
  const [activeRaceInfo, setActiveRaceInfo] = useState(null);
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  const popupRef = useRef(null);
  const [expandedComments, setExpandedComments] = useState({});

  const toggleComment = (uniqueId) => {
    setExpandedComments((prev) => ({
      ...prev,
      [uniqueId]: !prev[uniqueId],
    }));
  };

  const {
    data: raceData,
    error,
    loading,
  } = useFetch(
    activeRaceInfo
      ? `/collateral/form/by-race-id?race_id=${activeRaceInfo.raceId}&race_date=${activeRaceInfo.raceDate}&horse_id=${activeRaceInfo.horseId}&todays_race_date=${todaysRaceDate}`
      : null
  );

  const handleClick = (raceId, raceDate, horseId, event) => {
    event.preventDefault();
    const rect = event.target.getBoundingClientRect();
    if (
      activeRaceInfo &&
      activeRaceInfo.raceId === raceId &&
      activeRaceInfo.horseId === horseId
    ) {
      setActiveRaceInfo(null); // Close the popup if clicking the same horse
    } else {
      setPopupPosition({ x: rect.left, y: rect.bottom });
      setActiveRaceInfo({ raceId, raceDate, horseId });
    }
  };

  const handleClosePopup = () => {
    setActiveRaceInfo(null);
  };
  useEffect(() => {
    if (popupRef.current && activeRaceInfo) {
      const popupRect = popupRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      if (popupRect.bottom > viewportHeight) {
        const newY = Math.max(0, viewportHeight - popupRect.height - 20); // 20px padding
        setPopupPosition((prev) => ({ ...prev, y: newY }));
      }
    }
  }, [activeRaceInfo, raceData]);

  return (
    visibleHorses[horse.horse_id] && (
      <div className="overflow-y-auto relative" style={{ maxHeight: "640px" }}>
        <table className="min-w-full border-collapse">
          <thead className="sticky top-0 z-10 bg-gray-800">
            <tr className="bg-gray-800 text-white">
              <td colSpan="7" className="px-4 py-2">
                <div className="grid grid-cols-[200px,80px,180px,50px,80px,80px,50px,80px,130px] gap-2">
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
                    {data.hcap_range}
                  </span>
                  <span className="border border-gray-300 px-2 py-1 rounded text-xl">
                    {data.age_range}
                  </span>
                  <span className="border border-gray-300 px-2 py-1 rounded text-xl">
                    {data.first_place_prize_money}
                  </span>
                  <span className="border border-gray-300 px-2 py-1 rounded text-xl">
                    {data.race_type}
                  </span>
                  <span
                    className={`border border-gray-300 px-2 py-1 rounded text-xl text-white ${getSurfaceColorClass(
                      data.surface
                    )}`}
                  >
                    {data.surface}
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
                      <div className="grid grid-cols-[200px,80px,180px,50px,80px,80px,50px,80px,130px] gap-2">
                        <span
                          className={`border border-gray-300 px-2 py-1 rounded cursor-pointer hover:bg-gray-200 ${
                            activeRaceInfo &&
                            activeRaceInfo.raceId ===
                              performance_data.race_id &&
                            activeRaceInfo.horseId === horse.horse_id
                              ? "bg-blue-200"
                              : ""
                          }`}
                          onClick={(e) =>
                            handleClick(
                              performance_data.race_id,
                              performance_data.race_date,
                              horse.horse_id,
                              e
                            )
                          }
                        >
                          {performance_data.course}
                          {loading &&
                            activeRaceInfo &&
                            activeRaceInfo.raceId ===
                              performance_data.race_id &&
                            activeRaceInfo.horseId === horse.horse_id &&
                            " (Loading...)"}
                        </span>
                        <span className="border border-gray-300 px-2 py-1 rounded">
                          {performance_data.distance}
                        </span>
                        <span className="border border-gray-300 px-2 py-1 rounded">
                          {performance_data.going}
                        </span>
                        <span className="border border-gray-300 px-2 py-1 rounded flex items-center justify-between">
                          <span>{performance_data.race_class}</span>
                          {performance_data.class_diff === "higher" && (
                            <span className="text-green-500 text-xl">▲</span>
                          )}
                          {performance_data.class_diff === "lower" && (
                            <span className="text-red-500 text-xl">▼</span>
                          )}
                          {performance_data.class_diff === "same" && (
                            <span> </span>
                          )}
                        </span>
                        <span className="border border-gray-300 px-2 py-1 rounded flex items-center justify-between">
                          <span>{performance_data.hcap_range}</span>
                          {performance_data.rating_range_diff === "higher" && (
                            <span className="text-green-500 text-xl">▲</span>
                          )}
                          {performance_data.rating_range_diff === "lower" && (
                            <span className="text-red-500 text-xl">▼</span>
                          )}
                          {performance_data.rating_range_diff === "same" && (
                            <span> </span>
                          )}
                        </span>
                        <span className=" text-md border border-gray-300 px-2 py-1 rounded">
                          {performance_data.age_range}
                        </span>
                        <span className="border border-gray-300 px-2 py-1 rounded">
                          {performance_data.first_place_prize_money}
                        </span>
                        <span className="border border-gray-300 px-2 py-1 rounded">
                          {performance_data.race_type}
                        </span>
                        <span
                          className={`border border-gray-300 px-2 py-1 rounded text-xl text-white ${getSurfaceColorClass(
                            performance_data.surface
                          )}`}
                        >
                          {performance_data.surface}
                        </span>
                      </div>
                    </td>
                  </tr>
                  <tr className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}>
                    <td colSpan="11" className="px-4 py-2 text-xl">
                      <div className="grid grid-cols-[60px,80px,80px,80px,70px,70px,1fr,100px,100px] gap-2">
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
                        <span className="border border-gray-300 px-2 py-1 rounded">
                          {performance_data.weeks_since_performance}{" "}
                        </span>
                        <span
                          className={`border border-gray-300 px-2 py-1 rounded ${
                            performance_data.weeks_since_last_ran > 16
                              ? "bg-red-500"
                              : ""
                          }`}
                        >
                          {performance_data.weeks_since_last_ran}{" "}
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
                    <td
                      className="px-4 py-2 cursor-pointer"
                      colSpan={8}
                      onClick={() => toggleComment(performance_data.unique_id)}
                    >
                      {performance_data.tf_comment}
                    </td>
                  </tr>
                  {expandedComments[performance_data.unique_id] && (
                    <tr
                      className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}
                    >
                      <td className="px-4 py-2 pl-8" colSpan={8}>
                        {performance_data.main_race_comment}
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
          </tbody>
        </table>
        {activeRaceInfo && raceData && !loading && (
          <div
            ref={popupRef}
            style={{
              position: "fixed",
              left: popupPosition.x,
              top: popupPosition.y,
              zIndex: 1000,
              maxHeight: "80vh",
              overflowY: "auto",
            }}
          >
            <RacePopup raceData={raceData} onClose={handleClosePopup} />
          </div>
        )}
      </div>
    )
  );
}
