import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import CurrentWeather from "./components/CurrentWeather";
import FiveDayForecast from "./components/FiveDayForecast";
import UnitToggle from "./components/UnitToggle";
import "./App.css";

const API_KEY = "bb0719a0aa0f5b2e1bdd0cda81c1adfc"; 

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [city, setCity] = useState(localStorage.getItem("lastSearchedCity") || "");
  const [isCelsius, setIsCelsius] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (city) {
      fetchWeatherData(city);
      fetchForecastData(city);
    }
  }, [city]);

  const fetchWeatherData = async (city) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
      );
      setWeatherData(response.data);
      localStorage.setItem("lastSearchedCity", city);
      setError(null);
    } catch (error) {
      setError("City not found. Please try again.");
    }
  };

  const fetchForecastData = async (city) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`
      );
      setForecastData(response.data.list);
      setError(null);
    } catch (error) {
      setError("Unable to fetch forecast data. Please try again.");
    }
  };

  const handleCitySearch = (cityName) => {
    setCity(cityName);
  };

  return (
    <div className="app">
      {/* Adding a header section */}
      <header className="app-header">
        <h1>Weather Pulse</h1>
        <p>Get the current weather and 5-day forecast for any city!</p>
      </header>

      {/* Search bar and weather data */}
      <SearchBar onSearch={handleCitySearch} />
      {error && <p className="error">{error}</p>}
      {weatherData && (
        <>
          <UnitToggle isCelsius={isCelsius} setIsCelsius={setIsCelsius} />
          <CurrentWeather data={weatherData} isCelsius={isCelsius} />
        </>
      )}
      {forecastData.length > 0 && <FiveDayForecast data={forecastData} isCelsius={isCelsius} />}
    </div>
  );
}

export default App;