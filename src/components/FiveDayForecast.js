import React from "react";

const FiveDayForecast = ({ data, isCelsius }) => {
  const formatTemperature = (temp) => {
    const tempInCelsius = temp - 273.15;
    return isCelsius ? `${tempInCelsius.toFixed(1)}°C` : `${(tempInCelsius * 9/5 + 32).toFixed(1)}°F`;
  };

  const getFiveDayForecast = (data) => {
    const dailyForecast = [];
    const middayHour = "12:00:00"; // 12 PM

    data.forEach((forecast) => {
      const time = forecast.dt_txt.split(" ")[1];
      if (time === middayHour) {
        dailyForecast.push(forecast);
      }
    });

    return dailyForecast.slice(0, 5); // Return only the first 5 days
  };

  const fiveDayData = getFiveDayForecast(data);

  return (
    <div className="five-day-forecast">
      {fiveDayData.map((forecast, index) => (
        <div className="forecast-card" key={index}>
          <h3>{new Date(forecast.dt_txt).toLocaleDateString("en-US", { weekday: "short", day: "numeric", month: "short" })}</h3>
          <img
            src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`}
            alt="weather icon"
            className="weather-icon"
          />
          <p>{forecast.weather[0].description}</p>
          <p className="temperature">{formatTemperature(forecast.main.temp)}</p>
        </div>
      ))}
    </div>
  );
};

export default FiveDayForecast;