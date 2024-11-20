import React from 'react';
import { WeatherData } from '../../services/api';
import {
  CloudIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  ArrowTrendingUpIcon,
} from '@heroicons/react/24/outline';

interface CurrentWeatherProps {
  data: WeatherData;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ data }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
      {/* Location and Time */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            {data.location}
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            {new Date(data.timestamp).toLocaleDateString('en-US', {
              weekday: 'long',
              hour: 'numeric',
              minute: 'numeric',
            })}
          </p>
        </div>
        <CloudIcon className="h-10 w-10 text-weather-primary dark:text-weather-secondary" />
      </div>

      {/* Temperature Display */}
      <div className="mt-6">
        <div className="flex items-center">
          <span className="text-6xl font-bold text-gray-800 dark:text-white">
            {Math.round(data.temperature.current)}°C
          </span>
          <div className="ml-6">
            <p className="text-gray-500 dark:text-gray-400">
              Feels like {Math.round(data.temperature.feels_like)}°C
            </p>
            <p className="text-lg font-semibold text-gray-800 dark:text-white capitalize">
              {data.description}
            </p>
          </div>
        </div>

        {/* Temperature Range */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="flex items-center space-x-2">
            <ArrowUpIcon className="h-5 w-5 text-red-500" />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">High</p>
              <p className="text-lg font-semibold text-gray-800 dark:text-white">
                {Math.round(data.temperature.max)}°C
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <ArrowDownIcon className="h-5 w-5 text-blue-500" />
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Low</p>
              <p className="text-lg font-semibold text-gray-800 dark:text-white">
                {Math.round(data.temperature.min)}°C
              </p>
            </div>
          </div>
        </div>

        {/* Additional Info */}
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
              {data.wind.speed.toFixed(1)} m/s
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;