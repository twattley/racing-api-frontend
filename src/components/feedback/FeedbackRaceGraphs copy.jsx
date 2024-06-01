import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    horse_name: "Horse A",
    horse_id: 1,
    performances: [
      {
        race_date: "2020-01-01",
        course: "Aintree",
        distance: "2m 4f",
        official_rating: null,
        ts: 96,
        rpr: 124,
        tfr: 119,
        tfig: 113,
      },
      {
        race_date: "2020-01-02",
        official_rating: 85,
        course: "Cheltenham",
        distance: "3m 2f",
        ts: 92,
        rpr: 120,
        tfr: 115,
        tfig: 110,
      },
    ],
  },
  {
    horse_name: "Horse B",
    horse_id: 2,
    performances: [
      {
        race_date: "2020-01-01",
        course: "Aintree",
        distance: "2m",
        official_rating: 88,
        ts: 89,
        rpr: 121,
        tfr: 118,
        tfig: 112,
      },
      {
        race_date: "2020-01-03",
        official_rating: 90,
        course: "Cheltenham",
        distance: "2m 4f",
        ts: 95,
        rpr: 125,
        tfr: 120,
        tfig: 115,
      },
    ],
  },
];

const fields = ["official_rating", "ts", "rpr", "tfr", "tfig"];

export function FeedbackRaceGraphs() {
  const [selectedFields, setSelectedFields] = useState(["ts"]);
  const [visibleHorses, setVisibleHorses] = useState(
    data.map((horse) => horse.horse_name)
  );

  const handleFieldChange = (event) => {
    const field = event.target.value;
    setSelectedFields((prevSelectedFields) =>
      prevSelectedFields.includes(field)
        ? prevSelectedFields.filter((f) => f !== field)
        : [...prevSelectedFields, field]
    );
  };

  const handleHorseVisibilityChange = (event) => {
    const horseName = event.target.value;
    setVisibleHorses((prevVisibleHorses) =>
      prevVisibleHorses.includes(horseName)
        ? prevVisibleHorses.filter((name) => name !== horseName)
        : [...prevVisibleHorses, horseName]
    );
  };

  const getTransformedData = (data, fields) => {
    const allDates = new Set();
    data.forEach((horse) => {
      horse.performances.forEach((performance) => {
        allDates.add(performance.race_date);
      });
    });

    const transformedData = {};
    allDates.forEach((date) => {
      transformedData[date] = { race_date: date };
      data.forEach((horse) => {
        const performance = horse.performances.find(
          (p) => p.race_date === date
        );
        fields.forEach((field) => {
          transformedData[date][`${horse.horse_name}_${field}`] = performance
            ? performance[field]
            : null;
        });
      });
    });

    return Object.values(transformedData);
  };

  const chartData = getTransformedData(data, selectedFields);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const horseData = payload.map((entry) => ({
        horse_name: entry.name.split(" (")[0],
        field: entry.name.split(" (")[1].slice(0, -1),
        value: entry.value,
        color: entry.color,
      }));

      const performance = payload[0].payload;

      return (
        <div className="custom-tooltip bg-white p-2 border rounded shadow-lg">
          <p className="label">{`Date: ${label}`}</p>
          <p className="label">{`Course: ${performance.course}`}</p>
          <p className="label">{`Distance: ${performance.distance}`}</p>
          {horseData.map((data, index) => (
            <p key={index} style={{ color: data.color }}>
              <strong>{data.horse_name}</strong> ({data.field}): {data.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <label className="mr-2">Select Fields:</label>
        {fields.map((field) => (
          <label key={field} className="mr-2">
            <input
              type="checkbox"
              value={field}
              checked={selectedFields.includes(field)}
              onChange={handleFieldChange}
              className="mr-1"
            />
            {field.toUpperCase()}
          </label>
        ))}
      </div>
      <div className="mb-4">
        <label className="mr-2">Show Horses:</label>
        {data.map((horse) => (
          <label key={horse.horse_id} className="mr-2">
            <input
              type="checkbox"
              value={horse.horse_name}
              checked={visibleHorses.includes(horse.horse_name)}
              onChange={handleHorseVisibilityChange}
              className="mr-1"
            />
            {horse.horse_name}
          </label>
        ))}
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={chartData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="race_date" />
          <YAxis padding={{ top: 20 }} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          {data.map((horse) =>
            visibleHorses.includes(horse.horse_name)
              ? selectedFields.map((field) => (
                  <Line
                    key={`${horse.horse_name}_${field}`}
                    type="monotone"
                    dataKey={`${horse.horse_name}_${field}`}
                    name={`${horse.horse_name} (${field.toUpperCase()})`}
                    stroke={`#${Math.floor(Math.random() * 16777215).toString(
                      16
                    )}`}
                    activeDot={{ r: 8 }}
                    connectNulls
                  />
                ))
              : null
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
