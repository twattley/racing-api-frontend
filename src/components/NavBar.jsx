import React from "react";

export function NavBar() {
  return (
    <nav className="bg-gray-800 p-4 rounded-lg shadow-md">
      <div className="container mx-auto flex justify-start space-x-10">
        <a
          href="/home"
          className="text-white font-semibold text-lg hover:text-gray-400"
        >
          Home
        </a>
        <a
          href="/today"
          className="text-white font-semibold text-lg hover:text-gray-400"
        >
          Today
        </a>
        <a
          href="/tomorrow"
          className="text-white font-semibold text-lg hover:text-gray-400"
        >
          Tomorrow
        </a>
        <a
          href="/feedback"
          className="text-white font-semibold text-lg hover:text-gray-400"
        >
          Feedback
        </a>
      </div>
    </nav>
  );
}
