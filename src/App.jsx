import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Home } from "./components/Home";
import { NavBar } from "./components/NavBar";
import { FeedBackRaces } from "./routes/feedback/FeedBackRaces";
import { FeedbackRaceWrapper } from "./routes/feedback/FeedbackRaceWrapper";
import { FeedbackRaceResult } from "./routes/feedback/FeedbackRaceResult";
import { TodaysRaces } from "./routes/today/TodaysRaces";
import { TodaysRaceWrapper } from "./routes/today/TodaysRaceWrapper";
import { BettingResults } from "./routes/betting/BettingResults";
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
          element={<FeedbackRaceWrapper />}
        />
        <Route
          path="/feedback_race/:race_id/result"
          element={<FeedbackRaceResult />}
        />
        <Route path="/today" element={<TodaysRaces />} />
        <Route path="/todays_race/:race_id" element={<TodaysRaceWrapper />} />
        <Route path="/betting" element={<BettingResults />} />
      </Routes>
    </div>
  );
}

export default App;
