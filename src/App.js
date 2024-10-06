// src/App.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import CurrentWeather from "./components/CurrentWeather";
import FiveDayForecast from "./components/FiveDayForecast";
import UnitToggle from "./components/UnitToggle";
import WeatherChart from "./components/WeatherChart"; // Import the WeatherChart component
import Footer from "./Footer"; // Import the Footer component
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
      <>
        {/* Background Layer */}
        <div className="background-gradient">
          <div className="app">
            {/* Header */}
            <header className="app-header">
              <h1 className="heading">Weather Me</h1>
            </header>
            <h1 className="tagline">Sunny Days or Stormy Nights: We’ve Got You Covered!</h1>
            {/* Search Bar */}
            <SearchBar onSearch={handleCitySearch} />

            {/* Error Handling */}
            {error && <p className="error">{error}</p>}

            {/* Weather Data Display */}
            {weatherData && (
                <>
                  <UnitToggle isCelsius={isCelsius} setIsCelsius={setIsCelsius} />
                  {/* Weather Container for Current Weather and Forecast */}
                  <div className="weather-container">
                    <CurrentWeather data={weatherData} isCelsius={isCelsius} />
                    {forecastData.length > 0 && (
                        <FiveDayForecast data={forecastData} isCelsius={isCelsius} />
                    )}
                  </div>
                </>
            )}

            {forecastData.length > 0 && (
                <WeatherChart forecastData={forecastData} isCelsius={isCelsius} />
            )}
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </>
  );
}

export default App;