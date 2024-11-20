import React from 'react';
import { WeatherData } from '../../services/api';
import { 
  ArrowUpIcon, 
  ArrowDownIcon,
  CloudIcon,
  EyeIcon,
} from '@heroicons/react/24/outline';

interface WeatherDetailsProps {
  data: WeatherData;
}

const WeatherDetails: React.FC<WeatherDetailsProps> = ({ data }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
        Weather Details
      </h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center space-x-3">
          <ArrowUpIcon className="h-5 w-5 text-weather-primary dark:text-weather-secondary" />
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">High</p>
            <p className="font-semibold text-gray-800 dark:text-white">
              {Math.round(data.temperature.max)}°C
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <ArrowDownIcon className="h-5 w-5 text-weather-primary dark:text-weather-secondary" />
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Low</p>
            <p className="font-semibold text-gray-800 dark:text-white">
              {Math.round(data.temperature.min)}°C
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <CloudIcon className="h-5 w-5 text-weather-primary dark:text-weather-secondary" />
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Humidity</p>
            <p className="font-semibold text-gray-800 dark:text-white">
              {data.humidity}%
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <EyeIcon className="h-5 w-5 text-weather-primary dark:text-weather-secondary" />
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Wind</p>
            <p className="font-semibold text-gray-800 dark:text-white">
              {Math.round(data.wind.speed)} m/s
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDetails;