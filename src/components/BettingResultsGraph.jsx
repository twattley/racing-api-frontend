import React, { useRef } from "react";
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

const generateChartData = (bettingResultsData) => {
  const bettingTypes = [
    ...new Set(bettingResultsData.map((item) => item.betting_type)),
  ];

  const datasets = bettingTypes.map((bettingType, index) => {
    const filteredData = bettingResultsData
      .filter((item) => item.betting_type === bettingType)
      .sort((a, b) => a.bet_number - b.bet_number);

    let runningTotal = 0;
    const data = filteredData.map((item, idx) => {
      runningTotal += item.bet_result;
      return {
        x: idx + 1, // Use index + 1 as x value instead of bet_number
        y: runningTotal,
      };
    });

    return {
      label: bettingType,
      data: data,
      borderColor: colorPalette[index % colorPalette.length],
      backgroundColor: colorPalette[index % colorPalette.length],
      pointRadius: 3,
      pointHoverRadius: 5,
    };
  });

  // Calculate aggregate data
  const aggregateData = bettingResultsData.reduce((acc, item) => {
    const existingPoint = acc.find((point) => point.x === item.bet_number);
    if (existingPoint) {
      existingPoint.y += item.bet_result;
    } else {
      acc.push({ x: item.bet_number, y: item.bet_result });
    }
    return acc;
  }, []);

  // Sort aggregate data and calculate running total
  aggregateData.sort((a, b) => a.x - b.x);
  let runningTotal = 0;
  aggregateData.forEach((point) => {
    runningTotal += point.y;
    point.y = runningTotal;
  });

  // Add aggregate dataset
  datasets.push({
    label: "Aggregate",
    data: aggregateData,
    borderColor: "rgb(0, 0, 0)", // Black color for aggregate line
    backgroundColor: "rgb(0, 0, 0)",
    pointRadius: 3,
    pointHoverRadius: 5,
    borderWidth: 3, // Make the aggregate line thicker
  });

  return { datasets };
};

const ChartOptions = (bettingResultsData) => ({
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      type: "linear",
      title: {
        display: true,
        text: "Bet Number",
      },
    },
    y: {
      title: {
        display: true,
        text: "Running Total",
      },
    },
  },
  plugins: {
    zoom: {
      zoom: {
        wheel: {
          enabled: true,
        },
        pinch: {
          enabled: true,
        },
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
      text: "Betting Results Comparison",
      font: {
        size: 18,
        weight: "bold",
      },
    },
    tooltip: {
      callbacks: {
        title: (context) => `Bet Number: ${context[0].parsed.x}`,
        label: (context) => {
          if (context.dataset.label === "Aggregate") {
            return [
              `Aggregate`,
              `Running Total: ${context.parsed.y.toFixed(2)}`,
            ];
          }
          const dataPoint = bettingResultsData.find(
            (item) =>
              item.bet_number === context.parsed.x &&
              item.running_total === context.parsed.y &&
              item.betting_type === context.dataset.label
          );
          return [
            `${context.dataset.label}`,
            `Running Total: ${context.parsed.y.toFixed(2)}`,
            `Horse: ${dataPoint.horse_name}`,
            `Date: ${new Date(dataPoint.race_date).toLocaleDateString()}`,
            `Bet Result: ${dataPoint.bet_result.toFixed(2)}`,
          ];
        },
      },
    },
    annotation: {
      annotations: {
        line1: {
          type: "line",
          yMin: 0,
          yMax: 0,
          borderColor: "rgb(0, 0, 0)",
          borderWidth: 2,
          borderDash: [6, 6],
        },
      },
    },
  },
});

export function BettingResultsGraph({ bettingResultsData }) {
  const chartRef = useRef(null);

  const data = generateChartData(bettingResultsData);
  const options = ChartOptions(bettingResultsData);

  const handleDoubleClick = () => {
    if (chartRef.current) {
      chartRef.current.resetZoom();
    }
  };

  return (
    <div className="h-[600px]" onDoubleClick={handleDoubleClick}>
      <Line ref={chartRef} data={data} options={options} />
    </div>
  );
}
