import React from "react";

function FiveDayForecast({ data, isCelsius }) {
  const convertTemp = (temp) => {
    return isCelsius
      ? (temp - 273.15).toFixed(1)
      : ((temp - 273.15) * 9) / 5 + 32;
  };

  return (
    <div className="forecast">
      <h2>5-Day Forecast</h2>
      <div className="forecast-grid">
        {data.map((forecast, index) => (
          <div key={index} className="forecast-item">
            <p>{new Date(forecast.dt * 1000).toLocaleDateString()}</p>
            <p>{forecast.weather[0].description}</p>
            <p>
              <strong>{convertTemp(forecast.main.temp)}°{isCelsius ? "C" : "F"}</strong>
            </p>
            <img
              src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`}
              alt="weather icon"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default FiveDayForecast;