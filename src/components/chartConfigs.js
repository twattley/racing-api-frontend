import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale } from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import annotationPlugin from 'chartjs-plugin-annotation';
import 'chartjs-adapter-date-fns';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  zoomPlugin,
  annotationPlugin
);

const Utils = {
  transparentize: (color, opacity) => {
    const alpha = opacity === undefined ? 0.5 : 1 - opacity;
    return color.replace("rgb", "rgba").replace(")", `, ${alpha})`);
  },
};

const baseConfig = {
  type: 'line',
  options: {
    responsive: true,
    plugins: {
      // ... (other plugin configurations)
      zoom: {
        limits: {
          x: {min: 'original', max: 'original'},
          y: {min: 'original', max: 'original'}
        },
        pan: {
          enabled: true,
          mode: 'xy',
          threshold: 10,
        },
        zoom: {
          wheel: {
            enabled: false,
          },
          pinch: {
            enabled: true
          },
          mode: 'xy',
          drag: {
            enabled: true,
            borderColor: 'rgba(54, 162, 235, 0.3)',
            borderWidth: 1,
            backgroundColor: 'rgba(54, 162, 235, 0.1)',
            animationDuration: 1000
          },
        }
      },
    },
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'month',
        },
        title: {
          display: false,
          text: 'Date',
        },
        ticks: {
          display: false,
          autoSkip: true,
          maxRotation: 45,
          minRotation: 45,
        },
      },
      y: {
        title: {
          display: true,
          text: 'Value',
        },
      },
    },
    hover: {
      mode: 'nearest',
      intersect: true,
    },
  },
};

export const mainChartConfig = {
  ...baseConfig,
  options: {
    ...baseConfig.options,
    hover: {
      mode: 'nearest',
      intersect: true,
    },
    onHover: (event, activeElements, chart) => {
      const chartElement = chart.getElementsAtEventForMode(event, 'nearest', { intersect: true }, false);
      if (chartElement.length > 0) {
        const datasetIndex = chartElement[0].datasetIndex;
        chart.data.datasets.forEach((dataset, index) => {
          if (index === datasetIndex) {
            dataset.borderWidth = 3;
            dataset.borderColor = dataset.originalBorderColor;
          } else {
            dataset.borderWidth = 1;
            dataset.borderColor = Utils.transparentize(dataset.originalBorderColor, 0.3);
          }
        });
      } else {
        chart.data.datasets.forEach((dataset) => {
          dataset.borderWidth = 2;
          dataset.borderColor = dataset.originalBorderColor;
        });
      }
      chart.update('none'); // Update without animation for smoother transitions
    },
  },
};

export const singleHorseChartConfig = {
  ...baseConfig,
  options: {
    ...baseConfig.options,
    plugins: {
      ...baseConfig.options.plugins,
      legend: {
        display: false,
        position: 'top',
      },
      title: {
        ...baseConfig.options.plugins.title,
        text: '', // We'll set this dynamically in the Graph component
      },
    },
    // Remove onHover for single horse chart
  },
};

export { ChartJS, Utils };