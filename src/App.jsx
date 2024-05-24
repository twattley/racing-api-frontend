import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Home } from "./components/Home";
import { Landing } from "./components/Landing";
import { NavBar } from "./components/NavBar";
import { FeedBackRaceTimes } from "./components/feedback/FeedBackRaces";
import { FeedbackRaceDetails } from "./components/feedback/FeedbachRaceDetails";
import { TodaysRaceTimes } from "./components/today/TodaysRaces";
import { TomorrowsRaceTimes } from "./components/tomorrow/TomorrowsRaces";



function App() {
  const location = useLocation();

  return (
    <div className="App">
      {location.pathname !== "/" && location.pathname !== "/home" && <NavBar />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/feedback" element={<FeedBackRaceTimes />} />
        <Route path="/race/:race_id" element={<FeedbackRaceDetails />} />
        <Route path="/today" element={<TodaysRaceTimes />} />
        <Route path="/tomorrow" element={<TomorrowsRaceTimes />} />
        {/* Add other routes here if needed */}
      </Routes>
    </div>
  );
}

export default App;
