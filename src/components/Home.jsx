import React from "react";
import { Link } from "react-router-dom";


export function Home() {
  const button = "w-180 p-12 bg-gray-200 rounded shadow-lg text-6xl font-semibold text-center";
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-6">
      <Link to="/today" className={button}>
        Today
      </Link>
      <Link to="/tomorrow" className={button}>
        Tomorrow
      </Link>
      <Link to="/feedback" className={button}>
        Feedback
      </Link>
    </div>
  );
}
