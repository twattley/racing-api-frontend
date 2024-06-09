import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { TodaysRaceFilters } from "./TodaysRaceFilters";

const extractTime = (raceTime) => {
  const dateTime = raceTime.split(" ")[0];
  return dateTime.split("T")[1].slice(0, 5);
};

export function TodaysRaceTimes({
  todaysRaceDataType,
  todaysRaceData,
  visibleCourses,
  toggleCourseVisibility,
}) {
  const [filters, setFilters] = useState({
    raceClass: "",
    distance: "",
    numberOfRunners: "",
  });

  const filterOptions = useMemo(() => {
    const options = {
      raceClasses: new Set(),
      distances: new Set(),
      numberOfRunners: new Set(),
    };
    todaysRaceData.forEach((raceDay) => {
      raceDay.courses.forEach((course) => {
        course.races.forEach((race) => {
          options.raceClasses.add(race.race_class);
          options.distances.add(race.distance);
          options.numberOfRunners.add(race.number_of_runners.toString()); // Ensure consistent data type
        });
      });
    });
    return {
      raceClasses: Array.from(options.raceClasses),
      distances: Array.from(options.distances),
      numberOfRunners: Array.from(options.numberOfRunners),
    };
  }, [todaysRaceData]);

  return (
    <div className="container mx-auto p-4">
      <TodaysRaceFilters
        filters={filters}
        setFilters={setFilters}
        filterOptions={filterOptions}
      />
      {todaysRaceData.map((raceDay, index) => (
        <div
          key={index}
          className="race-day mb-6 p-4 bg-white shadow-md rounded"
        >
          <h2 className="race-date text-2xl font-bold mb-4">
            {new Date(raceDay.race_date).toDateString()}
          </h2>

          {raceDay.courses.map((course, courseIndex) => (
            <div key={courseIndex} className="course mb-4">
              <h3
                className="course-name text-xl font-semibold mb-2 cursor-pointer"
                onClick={() => toggleCourseVisibility(courseIndex)}
              >
                {course.course}
              </h3>

              {visibleCourses[courseIndex] && (
                <div className="race-list ml-6">
                  {course.races
                    .filter(
                      (race) =>
                        (filters.raceClass === "" ||
                          race.race_class === filters.raceClass) &&
                        (filters.distance === "" ||
                          race.distance === filters.distance) 
                    )
                    .map((race) => (
                      <div key={race.race_id} className="group relative mb-1">
                        <Link
                          to={`/${todaysRaceDataType}_race/${race.race_id}`}
                          className="text-lg text-gray-600 group-hover:text-blue-500 hover:no-underline"
                        >
                          {extractTime(race.race_time)} {"-"} {race.race_title}
                        </Link>
                        <div
                          className="hidden group-hover:block absolute z-10 bg-white p-2 rounded shadow-lg top-full left-0 w-64 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                          style={{ transitionDelay: "200ms" }}
                        >
                          <p>Class: {race.race_class}</p>
                          <p>Distance: {race.distance}</p>
                          <p>Runners: {race.number_of_runners}</p>
                          <p>Prize: {race.total_prize_money}K</p>
                          <p>Going: {race.going}</p>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
