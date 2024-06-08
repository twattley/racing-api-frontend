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

export function RaceGraph({ data, filter }) {
  const chartData = generateChartData(data, filter);
  return <Line data={chartData} options={config.options} />;
};
