import React from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import { FaFire } from "react-icons/fa"; // Import fire icon

export function HorseDetails({
  horse,
  toggleHorseVisibility,
  visibleHorses,
  dutchHorseSelect,
  graphHorseSelect,
}) {
  return (
    <div key={horse.horse_id} className="mb-2">
      <h2
        className="text-2xl pt-2 font-bold mb-2 cursor-pointer"
        onClick={() => toggleHorseVisibility(horse.horse_id)}
      >
        <div className="grid grid-cols-[30px,30px,minmax(100px,auto),80px,80px,80px,80px,80px,80px,80px,80px,80px] gap-2">
          <button
            className="bg-gray-400 hover:bg-gray-900 text-white font-bold py-1 px-2 rounded"
            onClick={(e) => {
              e.stopPropagation();
              console.log("Horse selected:", horse.horse_name);
              dutchHorseSelect(horse);
            }}
          >
            D
          </button>
          <button
            className="bg-gray-400 hover:bg-gray-900 text-white font-bold py-1 px-2 rounded"
            onClick={(e) => {
              e.stopPropagation();
              console.log("Horse selected:", horse.horse_name);
              if (typeof graphHorseSelect === "function") {
                // Add this check
                graphHorseSelect(horse);
              } else {
                console.error("graphHorseSelect is not a function");
              }
            }}
          >
            G
          </button>
          <span
            className={`border border-gray-300 px-2 py-1 rounded ${
              !visibleHorses[horse.horse_id] ? "bg-gray-200" : ""
            }`}
          >
            {horse.horse_name}
          </span>
          <span
            className={`border border-gray-300 px-2 py-1 rounded ${
              !visibleHorses[horse.horse_id] ? "bg-white-200" : ""
            }`}
          >
            {horse.todays_horse_age}
          </span>
          <span
            className={`border border-gray-300 px-2 py-1 rounded ${
              !visibleHorses[horse.horse_id] ? "bg-white-200" : ""
            }`}
          >
            {horse.todays_official_rating}
          </span>
          <span
            className={`bg-blue-200 px-2 py-1 rounded ${
              !visibleHorses[horse.horse_id] ? "bg-blue-200" : ""
            }`}
          >
            {horse.todays_betfair_win_sp}
          </span>
          <span
            className={`bg-blue-200 px-2 py-1 rounded ${
              !visibleHorses[horse.horse_id] ? "bg-blue-200" : ""
            }`}
          >
            {horse.todays_betfair_place_sp}
          </span>
          <span
            className={`px-2 py-1 rounded flex items-center justify-center ${
              !visibleHorses[horse.horse_id]
                ? "bg-gray-200"
                : parseFloat(horse.todays_price_change) < -5
                ? "bg-orange-400"
                : parseFloat(horse.todays_price_change) < 0
                ? "bg-green-200"
                : parseFloat(horse.todays_price_change) > 5
                ? "bg-blue-300"
                : parseFloat(horse.todays_price_change) > 2
                ? "bg-blue-200"
                : "bg-gray-200"
            }`}
          >
            {horse.todays_price_change}
          </span>
          <span
            className={`bg-green-400 text-black px-2 py-1 rounded ${
              !visibleHorses[horse.horse_id] ? "bg-green-400" : ""
            }`}
          >
            {horse.todays_first_places}
          </span>
          <span
            className={`bg-green-300 text-black px-2 py-1 rounded ${
              !visibleHorses[horse.horse_id] ? "bg-green-300" : ""
            }`}
          >
            {horse.todays_second_places}
          </span>
          <span
            className={`bg-green-200 text-black px-2 py-1 rounded ${
              !visibleHorses[horse.horse_id] ? "bg-green-200" : ""
            }`}
          >
            {horse.todays_third_places}
          </span>
          <span
            className={`bg-black text-white px-2 py-1 rounded ${
              !visibleHorses[horse.horse_id] ? "bg-black-200 text-white" : ""
            }`}
          >
            {horse.number_of_runs}
          </span>
        </div>
      </h2>
    </div>
  );
}
