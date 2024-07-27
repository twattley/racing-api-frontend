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

const getSurfaceColorClass = (surface) => {
  const normalizedSurface = surface.trim().toLowerCase();
  switch (normalizedSurface) {
    case "turf":
      return "rgb(34, 197, 94)"; // Green
    case "polytrack":
      return "rgb(121, 85, 72)"; // Brown
    case "tapeta":
      return "rgb(188, 143, 143)"; // Light Brown
    case "fibresand":
      return "rgb(255, 193, 7)"; // Yellow
    case "artificial":
      return "rgb(255, 235, 59)"; // Light Yellow
    default:
      return "rgb(0, 0, 0)"; // Black for unknown surfaces
  }
};

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
        pointBackgroundColor: labels.map((label) => {
          const dataPoint = horse.performance_data?.find(
            (data) => data.race_date === label
          );
          return dataPoint
            ? getSurfaceColorClass(dataPoint.surface)
            : "rgba(0,0,0,0)";
        }),
        borderColor: color,
        backgroundColor: Utils.transparentize(color, 0.5),
        spanGaps: true,
        pointRadius: 7, // Increase point size
        pointHoverRadius: 9, // Increase point hover size
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
    .sort((a, b) => new Date(b) - new Date(a));

  const datasets = [
    {
      label: "Official Rating",
      data: horseData.performance_data
        .sort((a, b) => new Date(b.race_date) - new Date(a.race_date))
        .map((data) => data.official_rating),
      pointBackgroundColor: horseData.performance_data
        .sort((a, b) => new Date(b.race_date) - new Date(a.race_date))
        .map((data) => getSurfaceColorClass(data.surface)),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: Utils.transparentize("rgb(255, 99, 132)", 0.5),
      spanGaps: true,
      pointRadius: 7, // Increase point size
      pointHoverRadius: 9, // Increase point hover size
    },
    {
      label: "Speed",
      data: horseData.performance_data
        .sort((a, b) => new Date(b.race_date) - new Date(a.race_date))
        .map((data) => data.speed_figure),
      pointBackgroundColor: horseData.performance_data
        .sort((a, b) => new Date(b.race_date) - new Date(a.race_date))
        .map((data) => getSurfaceColorClass(data.surface)),
      borderColor: "rgb(75, 192, 192)",
      backgroundColor: Utils.transparentize("rgb(75, 192, 192)", 0.5),
      spanGaps: true,
      pointRadius: 7, // Increase point size
      pointHoverRadius: 9, // Increase point hover size
    },
    {
      label: "Rating",
      data: horseData.performance_data
        .sort((a, b) => new Date(b.race_date) - new Date(a.race_date))
        .map((data) => data.rating),
      pointBackgroundColor: horseData.performance_data
        .sort((a, b) => new Date(b.race_date) - new Date(a.race_date))
        .map((data) => getSurfaceColorClass(data.surface)),
      borderColor: "rgb(54, 162, 235)",
      backgroundColor: Utils.transparentize("rgb(54, 162, 235)", 0.5),
      spanGaps: true,
      pointRadius: 7, // Increase point size
      pointHoverRadius: 9, // Increase point hover size
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
