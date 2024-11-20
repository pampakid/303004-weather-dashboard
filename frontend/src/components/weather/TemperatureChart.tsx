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

// For demo purposes, we'll create some mock data
// Later we can replace this with real historical data
const generateMockData = (currentTemp: number) => {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const baseTemp = currentTemp;
  
  return hours.map(hour => ({
    time: `${hour}:00`,
    temperature: baseTemp + Math.sin(hour / 3) * 3 + (Math.random() - 0.5) * 2,
  }));
};

const TemperatureChart: React.FC<TemperatureChartProps> = ({ data }) => {
  const chartData = generateMockData(data.temperature.current);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
        Temperature Trend
      </h3>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="time"
              stroke="#6B7280"
              tick={{ fill: '#6B7280' }}
              tickFormatter={(value) => value.split(':')[0]}
            />
            <YAxis 
              stroke="#6B7280"
              tick={{ fill: '#6B7280' }}
              unit="°C"
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1F2937',
                border: 'none',
                borderRadius: '0.5rem',
                color: '#F9FAFB',
              }}
            />
            <Line
              type="monotone"
              dataKey="temperature"
              stroke="#00668A"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TemperatureChart;