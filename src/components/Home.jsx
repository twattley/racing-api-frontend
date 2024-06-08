import React from "react";
import { Link } from "react-router-dom";

export function Home() {
  const button =
    "w-180 p-12 bg-gray-200 rounded shadow-lg text-6xl font-semibold text-center";
  const activeButton = "active:bg-gray-300 active:shadow-inner"; // Additional classes for the active state

  return (
    <div className="flex flex-row items-center justify-center h-screen space-x-6">
      <Link to="/today" className={`${button} ${activeButton}`}>
        Today
      </Link>
      <Link to="/tomorrow" className={`${button} ${activeButton}`}>
        Tomorrow
      </Link>
      <Link to="/feedback" className={`${button} ${activeButton}`}>
        Feedback
      </Link>
    </div>
  );
}
