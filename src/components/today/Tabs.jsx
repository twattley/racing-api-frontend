import React from "react";
import { NavLink } from "react-router-dom";

export function TodaysTabs({ race_id }) {
  return (
    <div className="container mx-auto p-4">
      <div className="tabs flex justify-start bg-white border-b border-gray-300 pb-4">
        <NavLink
          to={`/todays_race/${race_id}/`}
          className={({ isActive }) =>
            `tab px-4 py-2 mx-2 text-lg font-bold border-b-2 ${
              isActive
                ? "border-gray-800 text-gray-800"
                : "border-transparent text-gray-600"
            } hover:text-gray-800`
          }
        >
          Form Data
        </NavLink>
        <NavLink
          to={`/todays_race/${race_id}/graphs`}
          className={({ isActive }) =>
            `tab px-4 py-2 mx-2 text-lg font-bold border-b-2 ${
              isActive
                ? "border-gray-800 text-gray-800"
                : "border-transparent text-gray-600"
            } hover:text-gray-800`
          }
        >
          Graphs
        </NavLink>
      </div>
    </div>
  );
}
