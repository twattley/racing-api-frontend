import React, { useState } from "react";
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

// Predefined Color Palette (Add more if needed)
const colorPalette = [
  "rgb(75, 192, 192)", // Green
  "rgb(54, 162, 235)", // Blue
  "rgb(255, 206, 86)", // Yellow
  "rgb(153, 102, 255)", // Purple
  "rgb(255, 159, 64)", // Orange
  "rgb(255, 99, 132)", // Red (Moved to the end)
];

const Utils = {
  transparentize: (color, opacity) => {
    const alpha = opacity === undefined ? 0.5 : 1 - opacity;
    return color.replace("rgb", "rgba").replace(")", `, ${alpha})`);
  },
};

const generateChartData = (raceData, filter, visibleHorses) => {
  if (!raceData || !raceData.horse_data) return { labels: [], datasets: [] };

  // Get all unique race dates and sort them
  const labels = Array.from(
    new Set(
      raceData.horse_data.flatMap(
        (horse) => horse.performance_data?.map((data) => data.race_date) || []
      )
    )
  ).sort((a, b) => new Date(a) - new Date(b));

  const datasets = raceData.horse_data
    .filter((horse) => visibleHorses[horse.horse_id])
    .map((horse, index) => {
      const color = colorPalette[index % colorPalette.length];
      return {
        label: horse.horse_name,
        data: labels.map((label) => {
          const dataPoint = horse.performance_data?.find(
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

const generateSingleHorseChartData = (horseData) => {
  if (!horseData || !horseData.performance_data)
    return { labels: [], datasets: [] };

  const labels = horseData.performance_data
    .map((data) => data.race_date)
    .sort((a, b) => new Date(b) - new Date(a)); // Sort in descending order

  const datasets = [
    {
      label: "Official Rating",
      data: horseData.performance_data
        .sort((a, b) => new Date(b.race_date) - new Date(a.race_date)) // Sort in descending order
        .map((data) => data.official_rating),
      borderColor: "rgb(255, 99, 132)", // Red
      backgroundColor: Utils.transparentize("rgb(255, 99, 132)", 0.5),
      spanGaps: true,
    },
    {
      label: "Speed",
      data: horseData.performance_data
        .sort((a, b) => new Date(b.race_date) - new Date(a.race_date)) // Sort in descending order
        .map((data) => data.speed_figure),
      borderColor: "rgb(75, 192, 192)", // Green
      backgroundColor: Utils.transparentize("rgb(75, 192, 192)", 0.5),
      spanGaps: true,
    },
    {
      label: "Rating",
      data: horseData.performance_data
        .sort((a, b) => new Date(b.race_date) - new Date(a.race_date)) // Sort in descending order
        .map((data) => data.rating),
      borderColor: "rgb(54, 162, 235)", // Blue
      backgroundColor: Utils.transparentize("rgb(54, 162, 235)", 0.5),
      spanGaps: true,
    },
  ];

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
          enabled: false, // Disable panning
        },
        zoom: {
          wheel: {
            enabled: false, // Disable zooming with the mouse wheel
          },
          pinch: {
            enabled: false, // Disable zooming with pinch gestures
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

export function Graph({ data, filter, visibleHorses, selectedHorse }) {
  const chartData = generateChartData(data, filter, visibleHorses);
  const singleHorseChartData = selectedHorse
    ? generateSingleHorseChartData(selectedHorse)
    : { labels: [], datasets: [] };

  return (
    <div>
      <Line data={chartData} options={config.options} />
      {selectedHorse && (
        <Line data={singleHorseChartData} options={config.options} />
      )}
    </div>
  );
}
