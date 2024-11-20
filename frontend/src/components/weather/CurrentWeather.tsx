import React from 'react';
import { WeatherData } from '../../services/api';

interface CurrentWeatherProps {
  data: WeatherData;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ data }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            {data.location}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
      </div>
      
      <div className="mt-6">
        <div className="flex items-center">
          <div className="text-6xl font-bold text-gray-800 dark:text-white">
            {Math.round(data.temperature.current)}°C
          </div>
          <div className="ml-6">
            <p className="text-gray-500 dark:text-gray-400">
              Feels like {Math.round(data.temperature.feels_like)}°C
            </p>
            <p className="text-lg font-semibold text-gray-800 dark:text-white capitalize">
              {data.description}
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div>
            <p className="text-gray-500 dark:text-gray-400">Humidity</p>
            <p className="text-lg font-semibold text-gray-800 dark:text-white">
              {data.humidity}%
            </p>
          </div>
          <div>
            <p className="text-gray-500 dark:text-gray-400">Wind Speed</p>
            <p className="text-lg font-semibold text-gray-800 dark:text-white">
              {data.wind.speed} m/s
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;