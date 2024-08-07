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
      pointBackgroundColor: labels.map((label) => {
        const dataPoint = selectedHorse.performance_data.find(
          (data) => data.race_date === label
        );
        return dataPoint
          ? getSurfaceColorClass(dataPoint.surface)
          : "rgba(0,0,0,0)";
      }),
      borderColor: "rgb(75, 192, 192)", // Green
      backgroundColor: Utils.transparentize("rgb(75, 192, 192)", 0.5),
      spanGaps: true,
      pointRadius: 7, // Increase point size
      pointHoverRadius: 9, // Increase point hover size
      originalBorderColor: "rgb(75, 192, 192)", // Store original color
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
      borderColor: "rgb(54, 162, 235)", // Blue
      backgroundColor: Utils.transparentize("rgb(54, 162, 235)", 0.5),
      spanGaps: true,
      pointRadius: 7, // Increase point size
      pointHoverRadius: 9, // Increase point hover size
      originalBorderColor: "rgb(54, 162, 235)", // Store original color
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
      borderColor: "rgb(255, 206, 86)", // Yellow
      backgroundColor: Utils.transparentize("rgb(255, 206, 86)", 0.5),
      spanGaps: true,
      pointRadius: 7, // Increase point size
      pointHoverRadius: 9, // Increase point hover size
      originalBorderColor: "rgb(255, 206, 86)", // Store original color
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
      annotation: {
        annotations: {},
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
    hover: {
      mode: "nearest",
      intersect: true,
    },
    onHover: (event, chartElement) => {
      const chart = chartRef.current;
      if (chart) {
        const datasets = chart.data.datasets;
        if (chartElement.length) {
          const datasetIndex = chartElement[0].datasetIndex;
          datasets.forEach((dataset, index) => {
            dataset.borderWidth = index === datasetIndex ? 3 : 1;
            dataset.borderColor =
              index === datasetIndex
                ? dataset.originalBorderColor
                : Utils.transparentize(dataset.originalBorderColor, 0.5);
          });
        } else {
          datasets.forEach((dataset) => {
            dataset.borderWidth = 1;
            dataset.borderColor = dataset.originalBorderColor;
          });
        }
        chart.update();
      }
    },
  },
};

export function Graph({ data, filter, visibleHorses, selectedHorse }) {
  const chartRef = useRef(null);
  const [annotations, setAnnotations] = useState({});

  const chartData = generateChartData(data, filter, visibleHorses);
  const singleHorseChartData = selectedHorse
    ? generateSingleHorseChartData(selectedHorse)
    : { labels: [], datasets: [] };

  // Calculate median and quartiles
  const allRatings = data.horse_data
    .flatMap((horse) => horse.performance_data.map((d) => d[filter]))
    .filter((rating) => rating !== null && rating !== undefined);

  const sortedRatings = allRatings.sort((a, b) => a - b);
  const medianRating = sortedRatings[Math.floor(sortedRatings.length / 2)];
  const q1Rating = sortedRatings[Math.floor(sortedRatings.length / 4)];
  const q3Rating = sortedRatings[Math.floor((sortedRatings.length * 3) / 4)];

  // Add annotations for median and quartiles
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

  useEffect(() => {
    setAnnotations((prevAnnotations) => ({
      ...prevAnnotations,
      ...ratingAnnotations,
    }));
  }, [medianRating, q1Rating, q3Rating]);

  useEffect(() => {
    const chart = chartRef.current;
    if (chart) {
      chart.options.plugins.annotation.annotations = annotations;
      chart.update();
    }
  }, [annotations]);

  return (
    <div>
      <Line ref={chartRef} data={chartData} options={config.options} />
      {selectedHorse && (
        <Line data={singleHorseChartData} options={config.options} />
      )}
    </div>
  );
}
