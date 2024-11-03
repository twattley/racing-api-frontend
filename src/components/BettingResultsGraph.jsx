import React, { useRef, useState } from "react";
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
} from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom";
import annotationPlugin from "chartjs-plugin-annotation";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  zoomPlugin,
  annotationPlugin
);

const colorPalette = [
  "rgb(75, 192, 192)", // Green
  "rgb(54, 162, 235)", // Blue
  "rgb(255, 206, 86)", // Yellow
  "rgb(153, 102, 255)", // Purple
  "rgb(255, 159, 64)", // Orange
  "rgb(255, 99, 132)", // Red
  "rgb(201, 203, 207)", // Grey
  "rgb(0, 128, 0)", // Dark Green
];

export function BettingResultsGraph({ bettingResultsData }) {
  const [activeTab, setActiveTab] = useState("aggregate");
  const chartRef = useRef(null);

  console.log("1. Component received:", bettingResultsData);
  console.log("2. bet_type_cum_sum:", bettingResultsData?.bet_type_cum_sum);

  // Debug check
  if (!bettingResultsData) {
    console.log("3. No bettingResultsData");
    return <div>No data received</div>;
  }

  if (!bettingResultsData.bet_type_cum_sum) {
    console.log("4. No bet_type_cum_sum");
    return <div>No betting data available</div>;
  }

  // Create datasets
  const datasets = Object.entries(bettingResultsData.bet_type_cum_sum).map(
    ([betType, values], index) => {
      console.log(`5. Processing ${betType}:`, values);
      return {
        label: betType.replace(/_/g, " ").toUpperCase(),
        data: values.map((value, idx) => ({
          x: idx + 1,
          y: value,
        })),
        borderColor:
          betType === "overall_total"
            ? "rgb(0, 0, 0)"
            : colorPalette[index % colorPalette.length],
        backgroundColor:
          betType === "overall_total"
            ? "rgb(0, 0, 0)"
            : colorPalette[index % colorPalette.length],
        pointRadius: 3,
        pointHoverRadius: 5,
        borderWidth: betType === "overall_total" ? 3 : 1,
      };
    }
  );

  console.log("6. Created datasets:", datasets);

  const chartData = {
    datasets:
      activeTab === "aggregate"
        ? datasets.filter(
            (d) => d.label.replace(/ /g, "_").toLowerCase() === "overall_total"
          )
        : datasets.filter(
            (d) => d.label.replace(/ /g, "_").toLowerCase() !== "overall_total"
          ),
  };

  console.log("7. Final chartData:", chartData);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: "linear",
        title: {
          display: true,
          text: "Bet Number",
        },
        ticks: {
          stepSize: 1,
        },
      },
      y: {
        title: {
          display: true,
          text: "Running Total (£)",
        },
      },
    },
    plugins: {
      zoom: {
        zoom: {
          wheel: { enabled: true },
          pinch: { enabled: true },
          mode: "xy",
        },
        pan: {
          enabled: true,
          mode: "xy",
        },
      },
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text:
          activeTab === "aggregate"
            ? "Aggregate Results"
            : "Individual Betting Types",
        font: {
          size: 18,
          weight: "bold",
        },
      },
      tooltip: {
        callbacks: {
          title: (context) => `Bet Number: ${context[0].parsed.x}`,
          label: (context) => [
            `${context.dataset.label}`,
            `Running Total: £${context.parsed.y.toFixed(2)}`,
          ],
        },
      },
    },
  };

  return (
    <div className="space-y-4">
      <div className="flex space-x-2 border-b">
        <button
          className={`px-4 py-2 ${
            activeTab === "aggregate"
              ? "text-blue-600 border-b-2 border-blue-600 font-medium"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("aggregate")}
        >
          Aggregate Results
        </button>
        <button
          className={`px-4 py-2 ${
            activeTab === "individual"
              ? "text-blue-600 border-b-2 border-blue-600 font-medium"
              : "text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("individual")}
        >
          Individual Types
        </button>
      </div>

      <div className="h-[600px]">
        <Line ref={chartRef} data={chartData} options={options} />
      </div>
    </div>
  );
}
