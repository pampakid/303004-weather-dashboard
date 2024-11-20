import React, { useState } from 'react';
import Dashboard from './components/layout/Dashboard';
import SearchLocation from './components/weather/SearchLocation';
import { weatherService, WeatherData } from './services/api';

function App() {
  // Change null to WeatherData | null to allow for both types
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (location: string) => {
    setLoading(true);
    setError(null);
    try {
      console.log('Searching for:', location);
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
      {loading && (
        <div className="text-center text-gray-600 dark:text-gray-300">Loading...</div>
      )}
      {weatherData && (
        <pre className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow overflow-auto">
          {JSON.stringify(weatherData, null, 2)}
        </pre>
      )}
    </Dashboard>
  );
}

export default App;