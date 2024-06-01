import React from "react";
import { NavLink } from "react-router-dom";

export function NavBar() {
  return (
    <nav className="bg-gray-800 p-4 rounded-lg shadow-md">
      <div className="container mx-auto flex justify-start space-x-10">
        <NavLink
          to="/"
          className="text-white font-semibold text-lg py-2 px-4 rounded-lg hover:text-gray-400"
        >
          Login
        </NavLink>
        <NavLink
          to="/today"
          className="text-white font-semibold text-lg py-2 px-4 rounded-lg hover:text-gray-400"
        >
          Today
        </NavLink>
        <NavLink
          to="/tomorrow"
          className="text-white font-semibold text-lg py-2 px-4 rounded-lg hover:text-gray-400"
        >
          Tomorrow
        </NavLink>
        <NavLink
          to="/feedback"
          className="text-white font-semibold text-lg py-2 px-4 rounded-lg hover:text-gray-400"
        >
          Feedback
        </NavLink>
      </div>
    </nav>
  );
}
