import React, { useState } from 'react';
import Dashboard from './components/layout/Dashboard';
import SearchLocation from './components/weather/SearchLocation';
import CurrentWeather from './components/weather/CurrentWeather';
import { weatherService, WeatherData } from './services/api';

function App() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (location: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await weatherService.getCurrentWeather(location);
      setWeatherData(data);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dashboard>
      <SearchLocation onSearch={handleSearch} />
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6">
          {error}
        </div>
      )}
      
      {loading ? (
        <div className="flex justify-center items-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-weather-primary"></div>
        </div>
      ) : weatherData ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CurrentWeather data={weatherData} />
        </div>
      ) : (
        <div className="text-center text-gray-500 dark:text-gray-400 p-8">
          Search for a location to see weather information
        </div>
      )}
    </Dashboard>
  );
}

export default App;