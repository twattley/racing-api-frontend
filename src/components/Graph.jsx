import React from "react";
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

const generateChartData = (sampleData, filter) => {
  // Get all unique race dates and sort them
  const labels = Array.from(
    new Set(
      sampleData.flatMap((item) =>
        item.performance_data.map((data) => data.race_date)
      )
    )
  ).sort((a, b) => new Date(a) - new Date(b));

  const datasets = sampleData.map((horse, index) => {
    const color = colorPalette[index % colorPalette.length];
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

export function RaceGraph({ data, filter }) {
  const chartData = generateChartData(data, filter);
  return <Line data={chartData} options={config.options} />;
}
