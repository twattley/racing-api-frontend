import React, { useState, useEffect } from "react";
import { Tabs } from "../../components/feedback/Tabs";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";

export function FeedbackRaceDetails() {
  const { race_id } = useParams();

  const {
    data: formData,
    error: formDataError,
    loading: formDataLoading,
  } = useFetch(`/feedback/todays-races/by-race-id?race_id=${race_id}`);

  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

  useEffect(() => {
    if (formData && Array.isArray(formData.horse_data)) {
      const initialVisibility = formData.horse_data.reduce((acc, horse) => {
        acc[horse.horse_id] = true;
        return acc;
      }, {});
      setVisibleHorses(initialVisibility);
    }
  }, [formData]);

  const [visibleHorses, setVisibleHorses] = useState({});

  const onSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedPerformances = (performances) => {
    if (sortConfig.key) {
      return [...performances].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return performances;
  };

  const toggleHorseVisibility = (horse_id) => {
    setVisibleHorses((prevState) => ({
      ...prevState,
      [horse_id]: !prevState[horse_id],
    }));
  };

  if (formDataLoading) {
    return <p>Loading data...</p>;
  }
  if (formDataError) {
    return <p>Error loading: {formDataError.message}</p>;
  }

return (
  <div className="container mx-auto p-4">
    <Tabs race_id={race_id} />
    {formData && (
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Race Details</h1>
        <p>
          <strong>Course:</strong> {formData.course}
        </p>
        <p>
          <strong>Distance:</strong> {formData.distance}
        </p>
        <p>
          <strong>Going:</strong> {formData.going}
        </p>
        <p>
          <strong>Surface:</strong> {formData.surface}
        </p>
        <p>
          <strong>Race Class:</strong> {formData.race_class}
        </p>
        <p>
          <strong>Handicap Range:</strong> {formData.hcap_range}
        </p>
        <p>
          <strong>Age Range:</strong> {formData.age_range}
        </p>
        <p>
          <strong>Conditions:</strong> {formData.conditions}
        </p>
        <p>
          <strong>Race Type:</strong> {formData.race_type}
        </p>
        <p>
          <strong>Race Title:</strong> {formData.race_title}
        </p>
        <p>
          <strong>Race Time:</strong> {formData.race_time}
        </p>
        <p>
          <strong>Race Date:</strong> {formData.race_date}
        </p>
      </div>
    )}
    {formData &&
      formData.horse_data.map((horse) => (
        <div key={horse.horse_id} className="mb-8">
          <h2
            className="text-2xl pt-4 font-bold mb-4 cursor-pointer"
            onClick={() => toggleHorseVisibility(horse.horse_id)}
          >
            <span className="border border-gray-300 px-2 py-1 rounded">
              {horse.horse_name}
            </span>
            <span className="bg-blue-200 px-2 py-1 rounded ml-2">
              {horse.todays_betfair_win_sp}
            </span>
            <span className="bg-blue-200 px-2 py-1 rounded ml-1">
              {horse.todays_betfair_place_sp}
            </span>
          </h2>
          {visibleHorses[horse.horse_id] && (
            <div className="overflow-y-auto" style={{ maxHeight: "640px" }}>
              <table className="min-w-full border-collapse">
                <thead>
                  <tr className="bg-gray-800 text-white">
                    <th
                      className="px-4 py-2 text-left cursor-pointer"
                      onClick={() => onSort("course")}
                    >
                      Course
                    </th>
                    <th
                      className="px-4 py-2 text-left cursor-pointer"
                      onClick={() => onSort("race_type")}
                    >
                      Race Type
                    </th>
                    <th>Distance</th>
                    <th
                      className="px-4 py-2 text-left cursor-pointer"
                      onClick={() => onSort("race_class")}
                    >
                      Race Class
                    </th>
                    <th
                      className="px-4 py-2 text-left cursor-pointer"
                      onClick={() => onSort("days_since_last_ran")}
                    >
                      DSLR
                    </th>
                    <th
                      className="px-4 py-2 text-left cursor-pointer"
                      onClick={() => onSort("days_since_performance")}
                    >
                      DSP
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sortedPerformances(horse.performance_data).map(
                    (performance_data, index) => (
                      <React.Fragment key={performance_data.unique_id}>
                        <tr
                          className={
                            index % 2 === 0 ? "bg-white" : "bg-gray-100"
                          }
                        >
                          <td className="px-4 py-2 group relative">
                            {performance_data.course}
                            <div className="hidden group-hover:block absolute z-10 bg-white p-2 rounded shadow-lg top-full left-0 whitespace-nowrap">
                              <div className="inline-block">
                                {performance_data.race_title}
                              </div>
                            </div>
                          </td>

                          <td className="px-4 py-2">{performance_data.race_type}</td>
                          <td className="px-4 py-2">{performance_data.distance}</td>
                          <td className="px-4 py-2">
                            {performance_data.race_class || "-"}
                          </td>
                          <td className="px-4 py-2">
                            {performance_data.days_since_last_ran}
                          </td>
                          <td className="px-4 py-2">
                            {performance_data.days_since_performance}
                          </td>
                        </tr>
                        <tr
                          className={
                            index % 2 === 0 ? "bg-white" : "bg-gray-100"
                          }
                        >
                          <td className="px-4 py-2" colSpan={6}>
                            {performance_data.main_race_comment}
                          </td>
                        </tr>
                        <tr
                          className={
                            index % 2 === 0 ? "bg-white" : "bg-gray-100"
                          }
                        >
                          <td className="px-4 py-2" colSpan={6}>
                            {performance_data.tf_comment}
                          </td>
                        </tr>
                      </React.Fragment>
                    )
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ))}
  </div>
);
}
