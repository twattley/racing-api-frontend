import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { RaceDatePicker } from "./RaceDatePicker";

export function FeedBackRaceTimes() {
  const [selectedDate, setSelectedDate] = useState(null);
  const formattedDate = selectedDate ? format(selectedDate, "yyyy-MM-dd") : '2023-01-01';
  const endpoint = formattedDate
    ? `/feedback/todays-races/by-date?date=${formattedDate}`
    : null;

  const { data, error, loading } = useFetch(endpoint, {
    dependencies: [endpoint],
  }); 

  const [visibleCourses, setVisibleCourses] = useState({});

  useEffect(() => {
    if (data) {
      const initialVisibility = {};
      data.forEach((raceDay) => {
        raceDay.courses.forEach((_, courseIndex) => {
          initialVisibility[courseIndex] = true;
        });
      });
      setVisibleCourses(initialVisibility);
    }
  }, [data]);

  const toggleCourseVisibility = (courseIndex) => {
    setVisibleCourses((prevState) => ({
      ...prevState,
      [courseIndex]: !prevState[courseIndex],
    }));
  };

  if (loading) return <p>Loading data...</p>;
  if (error) return <p>Error fetching data: {error.message}</p>; // Display error message

  return (
    <div className="container mx-auto p-4">
      <RaceDatePicker onDateChange={setSelectedDate} />
      {data && !loading && !error  && 
        (data.map((raceDay, index) => (
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
                  <ul className="race-list list-disc ml-6">
                    {course.races.map((race) => (
                      <li key={race.race_id} className="race-title mb-1">
                        <Link
                          to={`/race/${race.race_id}`}
                          className="text-blue-500 hover:underline"
                        >
                          {race.race_title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
}
