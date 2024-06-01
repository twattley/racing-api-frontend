import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { Tabs } from "../../components/feedback/Tabs";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  TimeScale,
  TimeSeriesScale,
} from "chart.js";
import "chartjs-adapter-date-fns";
import zoomPlugin from "chartjs-plugin-zoom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  TimeScale,
  TimeSeriesScale,
  zoomPlugin
);

const Utils = {
  transparentize: (color, opacity) => {
    const alpha = opacity === undefined ? 0.5 : 1 - opacity;
    return color.replace("rgb", "rgba").replace(")", `, ${alpha})`);
  },
  generateRandomColor: () => {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return `rgb(${r}, ${g}, ${b})`;
  },
};

const generateChartData = (sampleData, filter) => {
  // Extract and sort dates
  const labels = [
    ...new Set(
      sampleData.flatMap((item) =>
        item.performance_data.map((data) => data.race_date)
      )
    ),
  ].sort((a, b) => new Date(a) - new Date(b));

  const datasets = sampleData.map((horse, index) => {
    const color = Utils.generateRandomColor();
    return {
      label: horse.horse_name,
      data: labels.map((label) => {
        const dataPoint = horse.performance_data.find(
          (data) => data.race_date === label
        );
        return dataPoint ? dataPoint[filter] : null;
      }),
      borderColor: color,
      backgroundColor: Utils.transparentize(color, 0.5),
      spanGaps: true,
    };
  });

  return {
    labels,
    datasets,
  };
};

const config = {
  type: "line",
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: "right",
      },
      title: {
        display: true,
        text: "Ratings",
        font: {
          size: 26,
        },
      },
      zoom: {
        pan: {
          enabled: true,
          mode: "xy",
        },
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: "xy",
        },
      },
    },
    scales: {
      x: {
        type: "time",
        time: {
          unit: "month",
        },
        title: {
          display: true,
          text: "Date",
        },
        ticks: {
          autoSkip: true,
          maxRotation: 45,
          minRotation: 45,
        },
      },
      y: {
        title: {
          display: true,
          text: "Value",
        },
      },
    },
  },
};

export function FeedbackRaceGraphs() {
  const { race_id } = useParams();

  const {
    data: graphData,
    error: graphDataError,
    loading: graphDataLoading,
  } = useFetch(
    `/feedback/todays-races/graph/by-race-id?race_id=${race_id}`
  );

  const [filter, setFilter] = useState("official_rating");

  if (graphDataLoading) {
    return <p>Loading data...</p>;
  }

  if (graphDataError) {
    return <p>Error fetching data: {graphDataError}</p>;
  }

  const data = generateChartData(graphData, filter);

  return (
    <div className="p-4">
      <Tabs race_id={race_id} />
      <div className="mb-4">
        <label htmlFor="filter" className="mr-2 font-bold">
          Select Variable:
        </label>
        <select
          id="filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="p-2 border rounded-md"
        >
          <option value="official_rating">Official Rating</option>
          <option value="rpr">RPR</option>
          <option value="ts">TS</option>
          <option value="tfr">TFR</option>
          <option value="tfig">TFIG</option>
        </select>
      </div>
      <Line data={data} options={config.options} />
    </div>
  );
}
