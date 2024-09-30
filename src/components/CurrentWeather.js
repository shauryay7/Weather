import React from "react";

function CurrentWeather({ data, isCelsius }) {
  const temperature = isCelsius
    ? (data.main.temp - 273.15).toFixed(1)
    : ((data.main.temp - 273.15) * 9) / 5 + 32;
  
  return (
    <div className="current-weather">
      <h2>{data.name}</h2>
      <p>{data.weather[0].description}</p>
      <p>
        <strong>Temperature:</strong> {temperature}°{isCelsius ? "C" : "F"}
      </p>
      <p><strong>Humidity:</strong> {data.main.humidity}%</p>
      <p><strong>Wind Speed:</strong> {data.wind.speed} m/s</p>
      <img
        src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
        alt="weather icon"
      />
    </div>
  );
}

export default CurrentWeather;