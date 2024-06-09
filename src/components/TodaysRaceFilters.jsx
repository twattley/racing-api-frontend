import React from "react";

const SelectFilter = ({ label, value, onChange, options, id }) => {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <select
        id={id}
        value={value}
        onChange={onChange}
        className="ml-2 p-2 border rounded"
      >
        <option value="">All</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export function TodaysRaceFilters({ filters, setFilters, filterOptions }) {
  const handleFilterChange = (field) => (event) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [field]: event.target.value,
    }));
  };

  return (
    <div className="filters mb-4 flex flex-col md:flex-row gap-4">
      <SelectFilter
        label="Filter by Race Class:"
        value={filters.raceClass}
        onChange={handleFilterChange("raceClass")}
        options={filterOptions.raceClasses}
        id="raceClassFilter"
      />
      <SelectFilter
        label="Filter by Distance:"
        value={filters.distance}
        onChange={handleFilterChange("distance")}
        options={filterOptions.distances}
        id="distanceFilter"
      />
    </div>
  );
};
