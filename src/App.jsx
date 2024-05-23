import React from "react";
import { Routes, Route } from "react-router-dom";
import { Login } from "./components/Login";
import { Home } from "./components/Home";
import { FeedBackResultsData } from "./components/feedback/FeedBackResults";
import { FeedBackRaceTimes } from "./components/feedback/FeedBackRaces";
import { AccessibleTable } from "./components/AccessibleTable";
import { DessertDetail } from "./components/DessertDetail"; // Import the new DessertDetail component
import { FoodTypeDetail } from "./components/FoodTypeDetail"; // Import the new FoodTypeDetail component

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/feedback/races" element={<FeedBackRaceTimes />} />
        <Route path="/feedback/results" element={<FeedBackResultsData />} />
        <Route path="/table" element={<AccessibleTable />} />
        <Route path="/dessert/:id" element={<DessertDetail />} />{" "}
        <Route path="/food_type/:id" element={<FoodTypeDetail />} />{" "}
      </Routes>
    </div>
  );
}

export default App;
