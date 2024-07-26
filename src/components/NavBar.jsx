import React from "react";
import { NavLink } from "react-router-dom";

export function NavBar() {
  return (
    <nav className="bg-gray-800 p-4 rounded-lg shadow-md">
      <div className="flex justify-start space-x-10">
        <NavLink
          to="/"
          className="text-white font-semibold text-3xl py-2 px-4 rounded-lg hover:text-gray-400"
        >
          Home
        </NavLink>
        <NavLink
          to="/today"
          className="text-white font-semibold text-3xl py-2 px-4 rounded-lg hover:text-gray-400"
        >
          Today
        </NavLink>
        <NavLink
          to="/feedback"
          className="text-white font-semibold text-3xl py-2 px-4 rounded-lg hover:text-gray-400"
        >
          Feedback
        </NavLink>
      </div>
    </nav>
  );
}
