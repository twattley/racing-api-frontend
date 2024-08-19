import React, { useRef, useEffect, useState } from "react";
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
import annotationPlugin from "chartjs-plugin-annotation";
import { mainChartConfig, singleHorseChartConfig } from "./chartConfigs";

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
  zoomPlugin,
  annotationPlugin
);

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
        pointBackgroundColor: color, // Use the line color for point fill
        pointBorderColor: color, // Use the line color for point border
        borderColor: color,
        backgroundColor: Utils.transparentize(color, 0.5),
        spanGaps: true,
        pointRadius: 4, // Slightly reduced point size
        pointHoverRadius: 6, // Slightly reduced hover size
        originalBorderColor: color, // Store original color
      };
    });

  return {
    labels,
    datasets,
  };
};

const generateSingleHorseChartData = (selectedHorse) => {
  if (!selectedHorse || !selectedHorse.performance_data)
    return { labels: [], datasets: [] };

  const labels = selectedHorse.performance_data
    .map((data) => data.race_date)
    .sort((a, b) => new Date(a) - new Date(b));

  const datasets = [
    {
      label: `Official Rating`,
      data: labels.map((label) => {
        const dataPoint = selectedHorse.performance_data.find(
          (data) => data.race_date === label
        );
        return dataPoint ? dataPoint.official_rating : null;
      }),
      pointBackgroundColor: "rgb(0, 0, 0)", // Black dots
      pointBorderColor: "rgb(0, 0, 0)", // Black border for dots
      borderColor: "rgb(0, 0, 0)", // Black line
      backgroundColor: "rgba(0, 0, 0, 0.1)", // Very light black for area under the line
      spanGaps: true,
      pointRadius: 3, // Much smaller points
      pointHoverRadius: 4, // Slightly larger on hover, but still small
      borderDash: [5, 5], // Dashed line
      borderWidth: 2,
    },
    {
      label: `Rating`,
      data: labels.map((label) => {
        const dataPoint = selectedHorse.performance_data.find(
          (data) => data.race_date === label
        );
        return dataPoint ? dataPoint.rating : null;
      }),
      pointBackgroundColor: labels.map((label) => {
        const dataPoint = selectedHorse.performance_data.find(
          (data) => data.race_date === label
        );
        return dataPoint
          ? getSurfaceColorClass(dataPoint.surface)
          : "rgba(0,0,0,0)";
      }),
      borderColor: "rgb(255, 99, 132)", // Red
      backgroundColor: Utils.transparentize("rgb(255, 99, 132)", 0.5),
      spanGaps: true,
      pointRadius: 7,
      pointHoverRadius: 9,
      originalBorderColor: "rgb(54, 162, 235)",
    },
    {
      label: `Speed Figure`,
      data: labels.map((label) => {
        const dataPoint = selectedHorse.performance_data.find(
          (data) => data.race_date === label
        );
        return dataPoint ? dataPoint.speed_figure : null;
      }),
      pointBackgroundColor: labels.map((label) => {
        const dataPoint = selectedHorse.performance_data.find(
          (data) => data.race_date === label
        );
        return dataPoint
          ? getSurfaceColorClass(dataPoint.surface)
          : "rgba(0,0,0,0)";
      }),
      borderColor: "rgb(54, 162, 256)", // Blue
      backgroundColor: Utils.transparentize("rgb(255, 206, 86)", 0.5),
      spanGaps: true,
      pointRadius: 7,
      pointHoverRadius: 9,
      originalBorderColor: "rgb(255, 206, 86)",
    },
  ];

  return {
    labels,
    datasets,
  };
};

export function Graph({ data, filter, visibleHorses, selectedHorse }) {
  const mainChartRef = useRef(null);
  const singleHorseChartRef = useRef(null);
  const [annotations, setAnnotations] = useState({});

  const chartData = generateChartData(data, filter, visibleHorses);
  const singleHorseChartData = selectedHorse
    ? generateSingleHorseChartData(selectedHorse, filter)
    : null;

  const allRatings = data.horse_data
    .flatMap((horse) => horse.performance_data.map((d) => d[filter]))
    .filter((rating) => rating !== null && rating !== undefined);

  const sortedRatings = allRatings.sort((a, b) => a - b);
  const medianRating = sortedRatings[Math.floor(sortedRatings.length / 2)];
  const q1Rating = sortedRatings[Math.floor(sortedRatings.length / 4)];
  const q3Rating = sortedRatings[Math.floor((sortedRatings.length * 3) / 4)];

  useEffect(() => {
    const ratingAnnotations = {
      q3Rating: {
        type: "line",
        yMin: q3Rating,
        yMax: q3Rating,
        borderColor: "orange",
        borderWidth: 2,
        borderDash: [10, 5],
        label: {
          content: "Q3 Rating",
          enabled: true,
          position: "end",
        },
      },
      medianRating: {
        type: "line",
        yMin: medianRating,
        yMax: medianRating,
        borderColor: "blue",
        borderWidth: 2,
        borderDash: [10, 5],
        label: {
          content: "Median Rating",
          enabled: true,
          position: "end",
        },
      },
      q1Rating: {
        type: "line",
        yMin: q1Rating,
        yMax: q1Rating,
        borderColor: "purple",
        borderWidth: 2,
        borderDash: [10, 5],
        label: {
          content: "Q1 Rating",
          enabled: true,
          position: "end",
        },
      },
    };

    setAnnotations(ratingAnnotations);
  }, [medianRating, q1Rating, q3Rating, filter]);

  const mainChartOptions = {
    ...mainChartConfig.options,
    plugins: {
      ...mainChartConfig.options.plugins,
      annotation: {
        annotations: annotations,
      },
      tooltip: {
        enabled: false,
      },
    },
  };

  const singleHorseChartOptions = {
    ...singleHorseChartConfig.options,
    plugins: {
      ...singleHorseChartConfig.options.plugins,
      title: {
        ...singleHorseChartConfig.options.plugins.title,
        display: true,
        text: selectedHorse ? selectedHorse.horse_name : "",
        font: {
          size: 28, // Increased font size
          weight: "bold",
        },
        padding: {
          top: 10,
          bottom: 30, // Add some padding below the title
        },
      },
    },
  };

  const handleDoubleClick = (chartRef) => {
    if (chartRef.current) {
      chartRef.current.resetZoom();
    }
  };

  return (
    <div>
      <div onDoubleClick={() => handleDoubleClick(mainChartRef)}>
        <Line ref={mainChartRef} data={chartData} options={mainChartOptions} />
      </div>
      {singleHorseChartData && (
        <div onDoubleClick={() => handleDoubleClick(singleHorseChartRef)}>
          <Line
            ref={singleHorseChartRef}
            data={singleHorseChartData}
            options={singleHorseChartOptions}
          />
        </div>
      )}
    </div>
  );
}
