import React from 'react';
import { WeatherData } from '../../services/api';
import {
  SunIcon,
  CloudIcon,
  CloudArrowDownIcon, // Using this instead of CloudRainIcon
} from '@heroicons/react/24/outline';

interface WeeklyForecastProps {
  data: WeatherData;
}

// Helper function to get weather icon based on description
const getWeatherIcon = (description: string) => {
    if (description.includes('rain') || description.includes('drizzle')) {
      return <CloudArrowDownIcon className="h-8 w-8 text-blue-500" />;
    } else if (description.includes('cloud')) {
      return <CloudIcon className="h-8 w-8 text-gray-500" />;
    } else if (description.includes('clear')) {
      return <SunIcon className="h-8 w-8 text-yellow-500" />;
    }
    // Default icon
    return <CloudIcon className="h-8 w-8 text-gray-400" />;
  };

// Generate weekly forecast data (we'll replace this with real API data later)
const generateWeekForecast = (currentTemp: number) => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const today = new Date().getDay();
  const weatherTypes = ['clear', 'cloudy', 'scattered clouds', 'rain'];
  
  return Array.from({ length: 7 }, (_, index) => {
    const dayIndex = (today + index) % 7;
    const tempVariation = Math.random() * 6 - 3;
    
    return {
      day: days[dayIndex],
      shortDay: days[dayIndex].slice(0, 3),
      maxTemp: Math.round(currentTemp + tempVariation + 2),
      minTemp: Math.round(currentTemp + tempVariation - 2),
      weather: weatherTypes[Math.floor(Math.random() * weatherTypes.length)]
    };
  });
};

const WeeklyForecast: React.FC<WeeklyForecastProps> = ({ data }) => {
  const weekForecast = generateWeekForecast(data.temperature.current);

  return (
    <div className="col-span-full bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
        7-Day Forecast
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {weekForecast.map((day, index) => (
          <div
            key={day.day}
            className={`
              flex flex-col items-center p-4 rounded-lg
              ${index === 0 ? 'bg-blue-50 dark:bg-blue-900/20' : 'bg-gray-50 dark:bg-gray-700/50'}
              hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors
            `}
          >
            <span className="text-sm font-medium text-gray-800 dark:text-white mb-2">
              {index === 0 ? 'Today' : day.shortDay}
            </span>
            
            {getWeatherIcon(day.weather)}
            
            <div className="mt-2 text-sm space-y-1">
              <div className="flex items-center justify-center space-x-2">
                <span className="text-gray-800 dark:text-white font-medium">
                  {day.maxTemp}°
                </span>
                <span className="text-gray-500 dark:text-gray-400">
                  {day.minTemp}°
                </span>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                {day.weather}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyForecast;