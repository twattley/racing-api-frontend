import React, { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { usePost } from "../../hooks/usePost";
import { RaceDatePicker } from "../../components/feedback/RaceDatePicker";

export function FeedBackRaceTimes() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [visibleCourses, setVisibleCourses] = useState({});

  const {
    data: currentDateData,
    error: currentDateError,
    loading: currentDateLoading,
  } = useFetch("/feedback/todays-races/current-date", {});

  useEffect(() => {
    if (currentDateData && !selectedDate) {
      setSelectedDate(new Date(currentDateData.today_date));
    }
  }, [currentDateData, selectedDate]);

  const formattedDate = selectedDate
    ? format(selectedDate, "yyyy-MM-dd")
    : null;
  const endpoint = formattedDate
    ? `/feedback/todays-races/by-date?date=${formattedDate}`
    : null;

  const {
    data: feedbackData, 
    error: feedbackDataError,
    loading: feedbackDataLoading,
  } = useFetch(endpoint, { dependencies: [endpoint] });

  const {
    data: postResponse,
    error: postError,
    loading: postLoading,
    postData,
  } = usePost("/feedback/todays-races/selected-date", {}); // Use usePost hook

  useEffect(() => {
    if (feedbackData) {
      const initialVisibility = {};
      feedbackData.forEach((raceDay) => {
        raceDay.courses.forEach((_, courseIndex) => {
          initialVisibility[courseIndex] = true;
        });
      });
      setVisibleCourses(initialVisibility);
    }
  }, [feedbackData]);



  const toggleCourseVisibility = (courseIndex) => {
    setVisibleCourses((prevState) => ({
      ...prevState,
      [courseIndex]: !prevState[courseIndex],
    }));
  };

  if (
    currentDateLoading ||
    (feedbackDataLoading && !formattedDate) ||
    postLoading
  ) {
    return <p>Loading data...</p>;
  }
  if (currentDateError) {
    return <p>Error fetching current date: {currentDateError.message}</p>;
  }
  if (feedbackDataError) {
    return <p>Error fetching data: {feedbackDataError.message}</p>;
  }
  if (postError) {
    return <p>Error posting data: {postError.message}</p>;
  }
  if (!selectedDate || !feedbackData) {
    return <p>No data available. Please select a date.</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <RaceDatePicker onDateChange={setSelectedDate} />
      {feedbackData.map((raceDay, index) => (
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
                  {course.races.map((race) => (
                    <div key={race.race_id} className="group relative mb-1">
                      <Link
                        to={`/race/${race.race_id}`}
                        className="text-lg text-gray-600 group-hover:text-blue-500 hover:no-underline"
                      >
                        {race.race_title}
                      </Link>
                      <div
                        className="hidden group-hover:block absolute z-10 bg-white p-2 rounded shadow-lg top-full left-0 w-64 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                        style={{ transitionDelay: "200ms" }} // Add 200ms delay
                      >
                        {/* Add more details about the race here */}
                        <p>Class: {race.race_class}</p>
                        <p>Distance: {race.distance}</p>
                        <p>Runners: {race.number_of_runners}</p>
                        <p>Prize: {race.total_prize_money}K</p>
                        <p>Going: {race.going}</p>
                        {/* ... other details ... */}
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
