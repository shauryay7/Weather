// src/components/WeatherChart.js
import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const WeatherChart = ({ forecastData, isCelsius }) => {
  // Extract temperatures and time labels for the chart
  const labels = forecastData.map((item) => new Date(item.dt_txt).toLocaleString("en-US", { weekday: 'short', hour: 'numeric' }));
  const temperatures = forecastData.map((item) => {
    const tempInCelsius = item.main.temp - 273.15; // Convert from Kelvin to Celsius
    return isCelsius ? tempInCelsius : tempInCelsius * 9/5 + 32; // Convert to Fahrenheit if needed
  });

  const data = {
    labels,
    datasets: [
      {
        label: `Temperature (${isCelsius ? '°C' : '°F'})`,
        data: temperatures,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.raw.toFixed(2)} ${isCelsius ? '°C' : '°F'}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        ticks: {
          callback: function (value) {
            return `${value} ${isCelsius ? '°C' : '°F'}`;
          },
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default WeatherChart;