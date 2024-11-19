// frontend/src/services/api.ts
import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api/v1',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    }
});

// Weather service interface
export interface WeatherData {
    location: string;
    temperature: {
        current: number;
        feels_like: number;
        min: number;
        max: number;
    };
    humidity: number;
    wind: {
        speed: number;
        direction: number;
    };
    description: string;
    timestamp: string;
}

// Weather API service
export const weatherService = {
    // Get current weather for a location
    getCurrentWeather: async (location: string): Promise<WeatherData> => {
        try {
            const response = await api.get(`/weather/${location}`);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.error || 'Failed to fetch weather data');
            }
            throw error;
        }
    },

    // Get weather history for a location
    getWeatherHistory: async (location: string, days: number = 7): Promise<WeatherData[]> => {
        try {
            const response = await api.get(`/weather/history/${location}`, {
                params: { days }
            });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(error.response?.data?.error || 'Failed to fetch weather history');
            }
            throw error;
        }
    }
};