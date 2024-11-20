import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { WeatherData } from '../../services/api';

interface TemperatureChartProps {
  data: WeatherData;
}

// For demo purposes - we'll generate 24h of temperature data
// Later this could be replaced with actual historical data
const generateHourlyData = (currentTemp: number) => {
  return Array.from({ length: 24 }, (_, index) => {
    const hour = index;
    // Create a natural-looking temperature curve
    const variation = Math.sin((hour - 6) * Math.PI / 12) * 3;
    const temp = currentTemp + variation;
    
    return {
      hour: hour.toString().padStart(2, '0') + ':00',
      temperature: parseFloat(temp.toFixed(1)),
    };
  });
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
        <p className="text-gray-600 dark:text-gray-300">{label}</p>
        <p className="text-weather-primary dark:text-weather-secondary font-bold">
          {payload[0].value.toFixed(1)}°C
        </p>
      </div>
    );
  }
  return null;
};

const TemperatureChart: React.FC<TemperatureChartProps> = ({ data }) => {
  const hourlyData = generateHourlyData(data.temperature.current);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
        24-Hour Temperature Trend
      </h3>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={hourlyData}
            margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#374151"
              opacity={0.1}
            />
            <XAxis
              dataKey="hour"
              stroke="#6B7280"
              tick={{ fill: '#6B7280' }}
              tickFormatter={(value) => value.split(':')[0]}
            />
            <YAxis
              stroke="#6B7280"
              tick={{ fill: '#6B7280' }}
              domain={['auto', 'auto']}
              tickFormatter={(value) => `${value}°C`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="temperature"
              stroke="#00668A"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 8, fill: "#00668A" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      {/* Legend */}
      <div className="mt-4 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
        <div>
          Low: {Math.round(data.temperature.min)}°C
        </div>
        <div>
          Current: {Math.round(data.temperature.current)}°C
        </div>
        <div>
          High: {Math.round(data.temperature.max)}°C
        </div>
      </div>
    </div>
  );
};

export default TemperatureChart;