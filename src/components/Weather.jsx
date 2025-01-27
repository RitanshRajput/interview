import React, { useState } from "react";

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = "ENTER_YOUR-API-KEY";

  const fetchWeather = async () => {
    if (!city.trim()) {
      setError("Please enter a city name");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }

      const data = await response.json();

      if (data.cod === "404") {
        throw new Error("City not found");
      }

      setWeatherData(data);
    } catch (err) {
      setError(err.message || "Something went wrong");
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <h1 className="text-xl font-semibold text-center mb-4">Weather App</h1>

        <div className="mb-4">
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>

        <button
          onClick={fetchWeather}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
        >
          Fetch Weather
        </button>

        {loading && <p className="mt-4 text-center text-blue-500">Loading...</p>}

        {error && <p className="mt-4 text-center text-red-500">{error}</p>}

        {weatherData && (
          <div className="mt-6 bg-blue-100 p-4 rounded-lg">
            <h2 className="text-2xl font-semibold">{weatherData.name}</h2>
            <p className="text-gray-600 capitalize">{weatherData.weather[0].description}</p>
            <div className="flex justify-between mt-4">
              <div>
                <h3 className="text-lg font-medium">Temperature</h3>
                <p>{(weatherData.main.temp - 273.15).toFixed(2)}°C</p>
              </div>
              <div>
                <h3 className="text-lg font-medium">Humidity</h3>
                <p>{weatherData.main.humidity}%</p>
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-medium">Wind Speed</h3>
              <p>{weatherData.wind.speed} m/s</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherApp;
