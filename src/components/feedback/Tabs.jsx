import React from "react";
import { NavLink } from "react-router-dom";

export function FeedbackTabs({ race_id }) {
  return (
    <div className="w-full p-4">
      <div className="tabs flex justify-start bg-white border-b border-gray-300 pb-4">
        <NavLink
          to={`/feedback_race/${race_id}/`}
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
          to={`/feedback_race/${race_id}/result`}
          className={({ isActive }) =>
            `tab px-4 py-2 mx-2 text-lg font-bold border-b-2 ${
              isActive
                ? "border-gray-800 text-gray-800"
                : "border-transparent text-gray-600"
            } hover:text-gray-800`
          }
        >
          Result
        </NavLink>
      </div>
    </div>
  );
}
