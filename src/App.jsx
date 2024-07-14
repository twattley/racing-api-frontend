import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Home } from "./components/Home";
import { NavBar } from "./components/NavBar";
import { FeedBackRaces } from "./routes/feedback/FeedBackRaces";
import { FeedbackRaceDetails } from "./routes/feedback/FeedbackRaceDetails";
import { FeedbackRaceGraphs } from "./routes/feedback/FeedbackRaceGraphs";
import { FeedbackRaceResult } from "./routes/feedback/FeedbackRaceResult";
import { TodaysRaces } from "./routes/today/TodaysRaces";
import { TodaysRaceDetails } from "./routes/today/TodaysRaceDetails";
import { TodaysRaceGraphs } from "./routes/today/TodaysRaceGraphs";

function App() {
  const location = useLocation();

  return (
    <div className="App">
      {location.pathname !== "/" && location.pathname !== "/home" && <NavBar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/feedback" element={<FeedBackRaces />} />
        <Route
          path="/feedback_race/:race_id"
          element={<FeedbackRaceDetails />}
        />
        <Route
          path="/feedback_race/:race_id/graphs"
          element={<FeedbackRaceGraphs />}
        />
        <Route
          path="/feedback_race/:race_id/result"
          element={<FeedbackRaceResult />}
        />
        <Route path="/today" element={<TodaysRaces />} />
        <Route path="/todays_race/:race_id" element={<TodaysRaceDetails />} />
        <Route
          path="/todays_race/:race_id/graphs"
          element={<TodaysRaceGraphs />}
        />
      </Routes>
    </div>
  );
}

export default App;
